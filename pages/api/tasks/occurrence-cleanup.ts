import { NextApiHandler } from 'next';
import { DateTime } from 'luxon';
import type { Types } from 'mongoose';

import mongodbConnection from 'lib/mongodb-connection';
import Occurrence from 'models/mongodb/occurrence';
import Booking from 'models/mongodb/booking';
import Creator from 'models/mongodb/creator';

const handler: NextApiHandler = async (req, res) => {
    // Security checks
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
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
        }, 'bookings').lean();

        // Get the bookings to delete
        let bookingsToDelete: Types.ObjectId[] = [];
        for (const occ of occurrences) {
            for (const bookingId of occ.bookings) {
                // Just to be sure, delete booking from creator's requests
                await Creator.findOneAndUpdate(
                    { bookingRequests: bookingId }, 
                    { $pull: { bookingRequests: bookingId } }
                );
            }
            bookingsToDelete = bookingsToDelete.concat(occ.bookings as Types.ObjectId[]);
        }

        const { deletedCount: deletedBookings } = await Booking.deleteMany({ 
            _id: { $in: bookingsToDelete }
        });
        const { deletedCount: deletedOccurrences } = await Occurrence.deleteMany({ 
            dateEnd: { $lt: yesterday }
        });

        return res.status(201).json({ deletedOccurrences, deletedBookings });
    } catch(err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;