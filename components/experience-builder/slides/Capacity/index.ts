import Capacity from './Capacity';
import type { CompletableSlide } from 'models/application';

export interface CapacityProps extends CompletableSlide {
    capacity: number;
    onCapacityChange: (capacity: number) => void;
}

export default Capacity;