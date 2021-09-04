import { DateTime } from 'luxon';
import type { NextApiHandler } from 'next';

import { getStripe } from 'lib/server-stripe';
import { sendExperienceReminderEmail } from 'lib/sendgrid';
import mongodbConnection from 'lib/mongodb-connection';
import Occurrence from 'models/mongodb/occurrence';
import type { User as UserType } from 'models/mongodb/user';
import type { Creator as CreatorType } from 'models/mongodb/creator';
import type { Experience as ExperienceType } from 'models/mongodb/experience';
import type { Booking as BookingType } from 'models/mongodb/booking';

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

        const inOneDay = DateTime.utc().plus({ days: 1 }).toJSDate();
        const inTwoDays = DateTime.utc().plus({ days: 2 }).toJSDate();
        let remindersSent = 0;

        const upcomingOccurrences = await Occurrence.find({
            'bookings.0': { $exists: true },
            dateStart: {
                $gte: inOneDay,
                $lte: inTwoDays
            }
        }, 'experience bookings dateStart').populate([
            {
                path: 'experience',
                select: 'title creator location.meetPoint',
                populate: {
                    path: 'creator',
                    select: 'user',
                    populate: {
                        path: 'user',
                        select: 'fstName'
                    }
                }
            },
            {
                path: 'bookings',
                select: 'client stripe.paymentIntentId',
                populate: {
                    path: 'client',
                    select: 'emailAddress'
                }
            }
        ]).lean();

        for (const occurrence of upcomingOccurrences) {
            const experience = occurrence.experience as ExperienceType;
            const creator = (experience.creator as CreatorType).user as UserType;

            for (const booking of (occurrence.bookings as BookingType[])) {
                // Get the email indicated on the Stripe receipt
                const { receipt_email } = await stripe.paymentIntents.retrieve(
                    booking.stripe.paymentIntentId
                );
                // Use the email we store as a fallback
                const clientEmail = receipt_email || (booking.client as UserType).emailAddress;
                
                // Get the info for the email
                const isOnlineExperience = Boolean(experience.location.meetPoint);
                const meetingPoint = isOnlineExperience ? `at ${experience.location.meetPoint}` : 'online';
                const dateStart = DateTime.fromISO(occurrence.dateStart.toISOString());
                
                await sendExperienceReminderEmail(
                    experience.title,
                    creator.fstName,
                    meetingPoint,
                    dateStart.setLocale('en').toLocaleString(DateTime.DATETIME_MED),
                    dateStart.setLocale('fr').toLocaleString(DateTime.DATETIME_MED),
                    clientEmail
                );

                remindersSent++;
            }
        }

        return res.status(200).json({ remindersSent });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;