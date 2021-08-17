import Cors from 'micro-cors';
import { buffer } from 'micro';
import type { NextApiHandler, PageConfig } from 'next';
import type { RequestHandler } from 'micro';
import type Stripe from 'stripe';

import { 
    getStripe,
    handleSuccessfulPaymentIntent,
    handleCanceledPaymentIntent
} from 'lib/server-stripe';

const cors = Cors({
    allowMethods: ['POST', 'HEAD']
});

const stripe = getStripe();

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const buf = await buffer(req);
        const signature = req.headers['stripe-signature']!;
        
        // Construct the event
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(
                buf.toString(),
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err: any) {
            console.error(`[Stripe webhook]: ${err.message}`);
            return res.status(400).json({ error: err.message });
        } 
    
        // Based on its type, do what we need to do
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const payload = event.data.object as Stripe.PaymentIntent;
                handleSuccessfulPaymentIntent(payload);
                break;
            }
            case 'payment_intent.canceled': {
                const payload = event.data.object as Stripe.PaymentIntent;
                handleCanceledPaymentIntent(payload);
                break;
            }
            default:
                console.log(`[Stripe webhook] Unhandled event type ${event.type}`);
        }
        
        return res.status(201).json({ received: true });
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
}

export const config: PageConfig = {
    api: {
        bodyParser: false
    }
}

export default cors(handler as RequestHandler);
