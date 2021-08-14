import Duration from './Duration';
import type { CompletableSlide } from 'models/application';

export interface DurationProps extends CompletableSlide {
    duration: number;
    onDurationChange: (duration: number) => void;
}

export default Duration;