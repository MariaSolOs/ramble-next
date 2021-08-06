import type { Image } from './files';
import type { CardContentFragment } from 'graphql-server/operations';

export const CURRENCIES = [
    'CAD',
    'USD'
] as const;

export type BookingType = 'public' | 'private';

export type Currency = typeof CURRENCIES[number];

export type ExperienceCard = {
    _id: string;
    title: string;
    image: Image;
    isZoomExperience: boolean;
    location: string;
    price: number;
    rating?: number;
}

/**
 * Transforms the experience card data to a client side experience card.
 * 
 * @param cardQuery - The card fragment from the graphql query
 * @returns The transformed card
 */
export const getCardInfo = (cardQuery: CardContentFragment): ExperienceCard => ({
    _id: cardQuery._id,
    title: cardQuery.title,
    image: cardQuery.images[0],
    isZoomExperience: Boolean(cardQuery.zoomPMI),
    location: cardQuery.location,
    price: cardQuery.pricePerPerson,
    ...cardQuery.numberOfRatings > 0 && {
        rating: cardQuery.ratingValue
    }
});