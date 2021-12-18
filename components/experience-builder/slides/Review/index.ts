import type { NewExperienceForm } from 'models/experience-interface';
import type { CompletableSlide } from 'models/application';
import type { Image } from 'models/files';

import Review from './Review';

export interface ReviewProps extends CompletableSlide {
    creatorName: string;
    creatorPhoto: Image;
    creatorBio: string;
    form: NewExperienceForm;
}

export default Review;