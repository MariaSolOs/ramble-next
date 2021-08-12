import { getSession } from 'next-auth/client';
import type { NextApiHandler } from 'next';

import { getServerStripe } from 'lib/stripe';
import mongodbConnection from 'lib/mongodb-connection';
import { Creator } from 'models/mongodb';

const stripe = getServerStripe();

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return;
    }

    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ message: 'No session found.' });
        return;
    }

    const creatorId = session.user.creatorId;

    await mongodbConnection();

    // Get creator data
    const creator = await Creator.findById(creatorId, 'user stripe');
    if (!creator) {
        res.status(422).json({
            message: "Creator account not found." 
        });
        return;
    }
    
    // Check if they completed the onboarding
    let onboardingSuccess = true;
    const { details_submitted } = await stripe.accounts.retrieve(
        creator.stripe.accountId!
    );
    if (details_submitted) {
        // Creator signed up with Stripe
        creator.stripe.onboarded = true;
        await creator.save();
    } else {
        onboardingSuccess = false;
    }

    // Redirect them to the website
    res.redirect(307, `${process.env.RAMBLE_URL}?onboarding-status=${onboardingSuccess}`);
}

export default handler;