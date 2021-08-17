import type { NextApiHandler } from 'next';

import mongodbConnection from 'lib/mongodb-connection';
import User from 'models/mongodb/user';
import { sendPasswordResetEmail } from 'lib/sendgrid';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { email } = req.body;
        await mongodbConnection();

        const user = await User.findOne({ 
            emailAddress: email 
        }, '_id').lean(MONGOOSE_LEAN_DEFAULTS);

        if (!user) {
            return res.status(422).json({
                message: "There's no account associated to that email." 
            });
        }
    
        await sendPasswordResetEmail(user._id.toHexString(), email);
        return res.status(201).json({ message: 'Reset email sent' });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;