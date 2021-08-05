// Configuration for Mongoose lean()
export const MONGOOSE_LEAN_DEFAULTS = { defaults: true } as const;

// Experiences shown in the homepage
export const FEATURED_EXPERIENCES_IDS: { _id: string; title: string; }[] = [
    {
        _id: '60c50206daa7aa0017ca9c61',
        title: '#35mm Film Photography Introduction'
    },
    {
        _id: '60de31c925b39300171bd632',
        title: 'Pèlerinage des Canadiens de Montréal'
    },
    {
        _id: '60c25da7fb23720017a542e1',
        title: 'Introduction à la peinture acrylique'
    },
    {
        _id: '6069e90709d1ae00172f4ea4',
        title: 'Cocktails estivaux avec un mixologue'
    }
]

export const CLOUDINARY_BASE_URI = 'https://res.cloudinary.com/dxod7etqu/image/upload';