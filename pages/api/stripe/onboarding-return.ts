import { getSession } from 'next-auth/client';
import type { NextApiHandler } from 'next';

import { getStripe } from 'lib/server-stripe';
import mongodbConnection from 'lib/mongodb-connection';
import Creator from 'models/mongodb/creator';

const stripe = getStripe();

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: 'No session found.' });
        }

        const creatorId = session.user.creatorId;

        await mongodbConnection();

        // Get creator data
        const creator = await Creator.findById(creatorId, 'user stripe');
        if (!creator) {
            return res.status(422).json({
                message: "Creator account not found." 
            });
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
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;