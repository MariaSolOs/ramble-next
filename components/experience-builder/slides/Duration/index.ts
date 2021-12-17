import type { CompletableSlide } from 'models/application';

import Duration from './Duration';

export interface DurationProps extends CompletableSlide {
    duration: number;
    onDurationChange: (duration: number) => void;
}

export default Duration;