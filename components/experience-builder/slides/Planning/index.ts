import Planning from './Planning';
import type { CompletableSlide } from 'models/application';

export interface PlanningProps extends CompletableSlide {
    planning: string;
    onPlanningChange: (planning: string) => void;
}

export default Planning;
