import { getSession } from 'next-auth/client';
import type { NextApiHandler } from 'next';

import { getAccountLink } from 'lib/stripe';
import mongodbConnection from 'lib/mongodb-connection';
import { Creator } from 'models/mongodb';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';

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

    // Verify creator info
    const creator = await Creator.findById(creatorId, 'stripe').lean(MONGOOSE_LEAN_DEFAULTS);

    if (!creator || !creator.stripe.accountId) {
        res.status(422).json({ 
            message: "Creator account not registered." 
        });
        return;
    }

    // Create a new link
    const stripeRedirect = await getAccountLink(creator.stripe.accountId);

    // Redirect them to Stripe again
    res.redirect(307, stripeRedirect);
}

export default handler;