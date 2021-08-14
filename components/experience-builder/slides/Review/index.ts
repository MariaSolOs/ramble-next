import Review from './Review';
import type { 
    ExperienceForm,
    Experience as ExperienceType 
} from 'models/experience-interface';
import type { CompletableSlide } from 'models/application';
import type { Image } from 'models/files';

export interface ReviewProps extends CompletableSlide {
    creatorName: string;
    creatorPhoto: Image;
    creatorBio: string;
    form: ExperienceForm;
    previousExperience?: ExperienceType;
}

export default Review;