export const CURRENCIES = [
    'CAD',
    'USD'
] as const;

export type BookingType = 'public' | 'private';

export type Currency = typeof CURRENCIES[number];