import Landing from './Landing';
import type { Image } from 'models/files';
import type { ExperienceCard } from 'models/experience-interface';

export type LandingProps = {
    collageImages: Image[];
    featuredExperiences: ExperienceCard[];
}

export default Landing;