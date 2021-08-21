import type { CompletableSlide } from 'models/application';

import AgeRequirements from './AgeRequirements';

export interface AgeRequirementsProps extends CompletableSlide {
    isAgeRestricted: boolean;
    ageRequired: number;
    onAgeRestrictionChange: (restricted: boolean) => void;
    onAgeRequiredChange: (age: number) => void;
}

export default AgeRequirements;