import { getSession } from 'next-auth/client';
import type { NextApiHandler } from 'next';
import { Types } from 'mongoose';

import mongodbConnection from 'lib/mongodb-connection';
import Creator from 'models/mongodb/creator';
import Booking from 'models/mongodb/booking';
import { getStripe } from 'lib/server-stripe';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';

const stripe = getStripe();

// Capture/cancel a payment intent
const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const action = req.query.action as string;
        const { bookingId } = req.body;

        await mongodbConnection();

        // Make sure user is logged in
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ 
                message: 'Session not found.' 
            });
        }

        // Get the booking
        const booking = await Booking.findById(bookingId, 'stripe').lean(MONGOOSE_LEAN_DEFAULTS);
        if (!booking) {
            return res.status(422).send({ message: 'Invalid input.' });
        }

        // Remove request from creator's list
        await Creator.findByIdAndUpdate(session.user.creatorId, { 
            $pull: { bookingRequests: Types.ObjectId(bookingId) } 
        });

        // Capture/cancel the intent
        const intentId = booking.stripe.paymentIntentId;
        if (action === 'capture') {
            await stripe.paymentIntents.capture(intentId);
        } else if (action === 'cancel') {
            await stripe.paymentIntents.cancel(intentId);
        } else {
            return res.status(400).send({ error: 'Invalid action.' });
        }

        return res.status(201).send({ message: 'Payment intent processed.' });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;