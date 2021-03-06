import type { NextApiHandler } from 'next';

import mongodbConnection from 'lib/mongodb-connection';
import Creator from 'models/mongodb/creator';
import { getStripe, getAccountLink } from 'lib/server-stripe';

const stripe = getStripe();

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { creatorId } = req.body;
        
        await mongodbConnection();
        
        // Get creator data for the onboarding
        const creator = await Creator.findById(creatorId, 'user stripe');
        if (!creator) {
            return res.status(422).json({
                message: "Creator account not found." 
            });
        }
        
        let accountId = creator.stripe.accountId;
        if (!accountId) {
            // Create Stripe account if they don't have one already
            const account = await stripe.accounts.create({
                type: 'standard'
            });
    
            // Save account ID
            accountId = account.id;
            creator.stripe.accountId = account.id;
            await creator.save();
        }
        
        // Create account link
        const stripeRedirect = await getAccountLink(accountId);
            
        // Send Stripe onboarding link
        return res.status(201).json({ stripeRedirect });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;