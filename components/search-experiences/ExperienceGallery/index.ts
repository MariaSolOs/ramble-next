import ExperienceGallery from './ExperienceGallery';
import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';

export type ExperienceGalleryProps = {
    experiences: ExperienceCard[];
}

export default ExperienceGallery;