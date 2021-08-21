import type { CompletableSlide } from 'models/application';

import Planning from './Planning';

export interface PlanningProps extends CompletableSlide {
    planning: string;
    onPlanningChange: (planning: string) => void;
}

export default Planning;
