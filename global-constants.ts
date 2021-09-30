import type { DateTimeOptions } from 'luxon';

// Configuration for Mongoose lean()
export const MONGOOSE_LEAN_DEFAULTS = { defaults: true } as const;

export const CLOUDINARY_BASE_URI = 'https://res.cloudinary.com/dxod7etqu/image/upload';

// Social media
export const INSTAGRAM_LINK = 'https://www.instagram.com/experienceramble/';
export const FACEBOOK_LINK = 'https://www.facebook.com/experienceramble';

// For luxon Datetimes
export const TIMEZONE_CONFIG: DateTimeOptions = {
    zone: 'America/Toronto'
}

export const MAX_CREATOR_BIO_LENGTH = 500;