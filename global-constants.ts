import type { DateTimeOptions } from 'luxon';

// Configuration for Mongoose lean()
export const MONGOOSE_LEAN_DEFAULTS = { defaults: true } as const;

export const CLOUDINARY_BASE_URI = 'https://res.cloudinary.com/dxod7etqu/image/upload';

// For luxon Datetimes
export const TIMEZONE_CONFIG: DateTimeOptions = {
    zone: 'America/Toronto'
}

export const PHONE_NUMBER_REGEX = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
