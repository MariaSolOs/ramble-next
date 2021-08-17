import { getSession } from 'next-auth/client';
import type { NextApiHandler } from 'next';

import { getAccountLink } from 'lib/server-stripe';
import mongodbConnection from 'lib/mongodb-connection';
import Creator from 'models/mongodb/creator';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';

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

        // Verify creator info
        const creator = await Creator.findById(creatorId, 'stripe').lean(MONGOOSE_LEAN_DEFAULTS);

        if (!creator || !creator.stripe.accountId) {
            return res.status(422).json({ 
                message: "Creator account not registered." 
            });
        }

        // Create a new link
        const stripeRedirect = await getAccountLink(creator.stripe.accountId);

        // Redirect them to Stripe again
        res.redirect(307, stripeRedirect);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;