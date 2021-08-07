// Configuration for Mongoose lean()
export const MONGOOSE_LEAN_DEFAULTS = { defaults: true } as const;

// Experiences shown in the homepage
export const FEATURED_EXPERIENCES_IDS = [
    '60c50206daa7aa0017ca9c61', // #35mm Film Photography Introduction
    '60de31c925b39300171bd632', // Pèlerinage des Canadiens de Montréal
    '60c25da7fb23720017a542e1', // Introduction à la peinture acrylique
    '6069e90709d1ae00172f4ea4' // Cocktails estivaux avec un mixologue
]

export const CLOUDINARY_BASE_URI = 'https://res.cloudinary.com/dxod7etqu/image/upload';

// Stripe API configuration
export const STRIPE_API_VERSION = '2020-08-27';