import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';

import FeaturedExperiences from './FeaturedExperiences';

export type FeaturedExperiencesProps = {
    experiences: ExperienceCard[];
}

export default FeaturedExperiences;