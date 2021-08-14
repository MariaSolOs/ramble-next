import AgeRequirements from './AgeRequirements';
import type { CompletableSlide } from 'models/application';

export interface AgeRequirementsProps extends CompletableSlide {
    isAgeRestricted: boolean;
    ageRequired: number;
    onAgeRestrictionChange: (restricted: boolean) => void;
    onAgeRequiredChange: (age: number) => void;
}

export default AgeRequirements;