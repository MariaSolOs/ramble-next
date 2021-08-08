import { ExperienceCategory } from 'graphql-server/sdk';

export const EXPERIENCE_CATEGORIES = Object.values(ExperienceCategory).filter(
    val => isNaN(+val)
);

export type Category = typeof EXPERIENCE_CATEGORIES[number];

export const CURRENCIES = [
    'CAD',
    'USD'
] as const;

export type BookingType = 'public' | 'private';

export type Currency = typeof CURRENCIES[number];