import type { NextApiRequest, NextApiResponse } from 'next';

import mongodbConnection from 'mongodb-connection';
import { User } from 'models/mongodb';
import { sendPasswordResetEmail } from 'utils/sendgrid';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Should only be here when submitting the password reset form
        if (req.method !== 'POST') {
            return;
        }
        
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
        res.status(500).json({ error: err.message });
    }
}

export default handler;