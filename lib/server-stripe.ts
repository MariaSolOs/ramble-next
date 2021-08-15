import Stripe from 'stripe';

const serverStripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27'
});

/**
 * @returns The server-side Stripe instance.
 */
export const getStripe = () => {
    return serverStripe;
}

/**
 * @param accountId - The creator's Stripe account ID
 * @param creatorId - The creator's ID
 * @returns The URL to initiate the Stripe onboarding
 */
export const getAccountLink = async (accountId: string) => {
    const accountLink = await serverStripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.RAMBLE_URL}/api/stripe/onboarding-refresh`,
        return_url: `${process.env.RAMBLE_URL}/api/stripe/onboarding-return`,
        type: 'account_onboarding'
    });

    return accountLink.url;
}