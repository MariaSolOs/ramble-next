import { DateTime } from 'luxon';
import type { NextApiHandler } from 'next';
import type { Types } from 'mongoose';

import { sendReviewReminderEmail } from 'lib/sendgrid';
import { getStripe } from 'lib/server-stripe';
import mongodbConnection from 'lib/mongodb-connection';
import Occurrence from 'models/mongodb/occurrence';
import Booking from 'models/mongodb/booking';
import Creator from 'models/mongodb/creator';
import type { Booking as BookingType } from 'models/mongodb/booking';
import type { User as UserType } from 'models/mongodb/user';
import type { Experience as ExperienceType } from 'models/mongodb/experience';

const stripe = getStripe();

const handler: NextApiHandler = async (req, res) => {
    // Security checks
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    if (req.headers.authorization !== `Bearer ${process.env.TASK_API_SECRET}`) {
        return res.status(401).end('Unauthorized');
    }
    
    try {
        await mongodbConnection();

        // Find all old occurrences
        const yesterday = DateTime.utc().minus({ days: 1 }).endOf('day').toJSDate();
        const occurrences = await Occurrence.find({
            dateEnd: { $lt: yesterday }
        }, 'experience bookings').populate([
            {
                path: 'experience',
                select: '_id title'
            },
            {
                path: 'bookings',
                select: '_id client stripe.paymentIntentId',
                populate: {
                    path: 'client',
                    select: 'emailAddress'
                }
            }
        ]).lean();

        // Get the bookings to delete
        let bookingsToDelete: Types.ObjectId[] = [];
        for (const occ of occurrences) {
            const experience = occ.experience as ExperienceType;
            for (const booking of occ.bookings as BookingType[]) {
                // Just to be sure, delete booking from creator's requests
                await Creator.findOneAndUpdate(
                    { bookingRequests: booking._id }, 
                    { $pull: { bookingRequests: booking._id } }
                );

                // Get the email indicated on the Stripe receipt
                const { receipt_email } = await stripe.paymentIntents.retrieve(
                    booking.stripe.paymentIntentId
                );
                // Use the email we store as a fallback
                const clientEmail = receipt_email || (booking.client as UserType).emailAddress;
                // Send review reminder
                await sendReviewReminderEmail(
                    experience._id.toString(), 
                    experience.title,
                    clientEmail
                );
                
                bookingsToDelete.push(booking._id);
            }
        }

        const { deletedCount: deletedBookings } = await Booking.deleteMany({ 
            _id: { $in: bookingsToDelete }
        });
        const { deletedCount: deletedOccurrences } = await Occurrence.deleteMany({ 
            dateEnd: { $lt: yesterday }
        });

        return res.status(200).json({ deletedOccurrences, deletedBookings });
    } catch(err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;