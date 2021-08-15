import { v4 as uuid } from 'uuid';
import type { EventInput } from '@fullcalendar/react';

import { getFeesBreakdown } from 'lib/booking';
import { ExperienceCategory } from 'graphql-server/sdk';
import type { ExperienceViewFragment } from 'graphql-server/sdk';
import type { Image } from './files';

export type BookingType = 'public' | 'private';

export type Fees = ReturnType<typeof getFeesBreakdown>;

export const EXPERIENCE_CATEGORIES = Object.values(ExperienceCategory).filter(
    val => isNaN(+val)
);

export type Category = typeof EXPERIENCE_CATEGORIES[number];

export const CURRENCIES = [
    'CAD',
    'USD'
] as const;

export type Currency = typeof CURRENCIES[number];

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

export type Experience = Omit<ExperienceViewFragment, 'images'> & {
    images: Image[] | string[];
}

export interface ExperienceForm {
    isOnlineExperience?: boolean;
    location: string;
    meetingPoint: string;
    zoomMeetingId: string;
    zoomMeetingPassword: string;
    latitude: number;
    longitude: number;
    title: string;
    categories: Category[];
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
 * @param experience - Current experience (if the builder was in edit mode)
 * @returns Experience to use as parameter for the experience component
 */
export const getFormPreview = (
    creatorBio: string,
    creatorName: string,
    creatorPhoto: Image,
    images: string[], 
    form: ExperienceForm, 
    experience?: Experience,
): Experience => {
    return {
        _id: experience ? experience._id : uuid(),
        title: experience ? experience.title : form.title, 
        description: form.planning,
        location: experience ? experience.location : form.location,
        isOnlineExperience: experience ? experience.isOnlineExperience : form.isOnlineExperience!,
        ...!form.isOnlineExperience && {
            latitude: experience ? experience.latitude : form.latitude,
            longitude: experience ? experience.longitude : form.longitude
        },
        images,
        categories: experience ? experience.categories : form.categories,
        duration: form.duration,
        languages: form.languages,
        capacity: experience ? experience.capacity : form.capacity,
        ...form.isAgeRestricted && {
            ageRestriction: form.ageRequired
        },
        includedItems: form.included,
        toBringItems: form.toBring,
        pricePerPerson: form.pricePerPerson,
        creator: {
            bio: creatorBio,
            user: {
                firstName: creatorName,
                photo: creatorPhoto
            }
        }
    }
}