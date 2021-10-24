import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';

import ExperienceGallery from './ExperienceGallery';

export type ExperienceGalleryProps = {
    experiences: ExperienceCard[];
}

export default ExperienceGallery;