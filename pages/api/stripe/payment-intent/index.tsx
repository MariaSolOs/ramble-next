import type { NextApiHandler } from 'next';

import { getStripe } from 'lib/server-stripe';
import mongodbConnection from 'lib/mongodb-connection';
import Experience from 'models/mongodb/experience';
import { computeBookingFees } from 'lib/booking';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';
import type { Creator as CreatorType } from 'models/mongodb/creator';

const stripe = getStripe();

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const { experienceId, bookingType, numGuests } = req.body;

    await mongodbConnection();
    
    // Get the experience information
    const experience = await Experience.findById(
        experienceId, 'creator price zoomInfo'
    ).lean(MONGOOSE_LEAN_DEFAULTS).populate('creator', 'stripe');
    if (!experience) {
        return res.status(422).json({ error: 'Experience not found.' });
    }
    
    // Get the booking price
    const isInPersonExperience = !Boolean(experience.zoomInfo?.PMI);
    const fees = computeBookingFees(
        isInPersonExperience,
        bookingType,
        +numGuests,
        experience.price.perPerson,
        experience.price.private
    );
    
    // Create and send the client secret
    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: fees.amount,
        currency: experience.price.currency,
        application_fee_amount: fees.application_fee_amount,
        capture_method: 'manual',
        transfer_data: {
            destination: (experience.creator as CreatorType).stripe.accountId!
        },
        metadata: { // For Phil's accountability
            subtotal: fees.withServiceFee,
            serviceFee: fees.serviceFee,
            taxGST: fees.taxGST,
            taxQST: fees.taxQST
        }
    });
    
    return res.status(201).json({ clientSecret: paymentIntent.client_secret });
}


export default handler;
