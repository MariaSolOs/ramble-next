import { loadStripe } from '@stripe/stripe-js';
import type { Stripe as ClientStripe } from '@stripe/stripe-js';

let clientStripe: Promise<ClientStripe | null>;

/**
 * @returns The client-side Stripe instance.
 */
export const getStripe = () => {
    if (!clientStripe) {
        clientStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    }
    return clientStripe;
}