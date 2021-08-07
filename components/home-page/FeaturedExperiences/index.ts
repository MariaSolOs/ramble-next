import FeaturedExperiences from './FeaturedExperiences';
import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';

export type FeaturedExperiencesProps = {
    experiences: ExperienceCard[];
}

export default FeaturedExperiences;