import { v4 as uuid } from 'uuid';
import type { EventInput } from '@fullcalendar/react';

import { getFeesBreakdown } from 'lib/booking';
import { ExperienceCategory, Currency } from 'graphql-server/sdk';
import type { ExperienceViewFragment } from 'graphql-server/sdk';
import type { Image } from './files';

export type Fees = ReturnType<typeof getFeesBreakdown>;

// The following are ordered as displayed on the creation navbar
export const CREATION_STEPS = [
    'setting',
    'location',
    'title',
    'category',
    'planning',
    'duration',
    'language',
    'capacity',
    'age',
    'preview', 
    'included',
    'toBring',
    'price',
    'availabilities',
    'review'
] as const;

export type CreationStep = typeof CREATION_STEPS[number];

// The following are ordered as displayed on the editing navbar
export const EDIT_STEPS = [
    'location',
    'planning',
    'duration',
    'language',
    'age',
    'preview', 
    'included',
    'toBring',
    'price'
] as const;

export type EditStep = typeof EDIT_STEPS[number];

export type Experience = Omit<ExperienceViewFragment, 'images'> & {
    images: Image[] | string[];
}

export interface NewExperienceForm {
    isOnlineExperience?: boolean;
    location: string;
    meetingPoint: string;
    zoomMeetingId: string;
    zoomMeetingPassword: string;
    latitude: number;
    longitude: number;
    title: string;
    categories: ExperienceCategory[];
    planning: string;
    duration: number; // In hours
    languages: string[];
    capacity: number;
    isAgeRestricted: boolean;
    ageRequired: number; 
    images: (File | string | undefined)[];
    included: string[];
    toBring: string[];
    pricePerPerson: number;
    privatePrice: number;
    currency: Currency;
    slots?: EventInput[];
}

/**
 * @param creatorBio - The creator's bio
 * @param creatorName - The creator's name
 * @param creatorPhoto - The creator's photo
 * @param form - Experience builder form
 * @param images - Array of image URLs
 * @returns Experience to use as parameter for the experience component
 */
export const getFormPreview = (
    creatorBio: string,
    creatorName: string,
    creatorPhoto: Image,
    images: string[], 
    form: NewExperienceForm
): Experience => {
    return {
        _id: uuid(),
        title: form.title, 
        description: form.planning,
        location: form.location,
        isOnlineExperience: form.isOnlineExperience!,
        ...!form.isOnlineExperience && {
            latitude: form.latitude,
            longitude: form.longitude
        },
        images,
        categories: form.categories,
        duration: form.duration,
        languages: form.languages,
        capacity: form.capacity,
        ...form.isAgeRestricted && {
            ageRestriction: form.ageRequired
        },
        includedItems: form.included,
        toBringItems: form.toBring,
        pricePerPerson: form.pricePerPerson,
        numRatings: 0,
        creator: {
            bio: creatorBio,
            user: {
                firstName: creatorName,
                photo: creatorPhoto
            }
        }
    }
}