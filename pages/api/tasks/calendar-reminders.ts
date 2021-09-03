import type { NextApiHandler } from 'next';
import type { Types } from 'mongoose';

import { sendCalendarReminderEmail } from 'lib/sendgrid';
import mongodbConnection from 'lib/mongodb-connection';
import Experience from 'models/mongodb/experience';
import Occurrence from 'models/mongodb/occurrence';
import User from 'models/mongodb/user';

const handler: NextApiHandler = async (req, res) => {
    // Security checks
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end('Method Not Allowed');
    }
    if (req.headers.authorization !== `Bearer ${process.env.TASK_API_SECRET}`) {
        return res.status(401).end('Unauthorized');
    }

    try {
        await mongodbConnection();
    
        const experiencesAlerted: { _id: Types.ObjectId; title: string; }[] = [];
    
        // Find all experiences in the gallery
        const experiences = await Experience.find({ 
            status: 'approved' 
        }, '_id title creator').lean();
    
        for (const exp of experiences) {
            // If no occurrences exist, send email to creator
            if (!(await Occurrence.exists({ experience: exp._id }))) {
                const creator = await User.findOne({ 
                    creator: exp.creator 
                }, 'emailAddress').lean();
                await sendCalendarReminderEmail(exp.title, creator!.emailAddress);
    
                experiencesAlerted.push({
                    _id: exp._id,
                    title: exp.title
                });
            }
        }
    
        return res.status(200).json({ experiencesAlerted });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export default handler;