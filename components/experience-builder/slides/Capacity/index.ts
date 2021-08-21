import type { CompletableSlide } from 'models/application';

import Capacity from './Capacity';

export interface CapacityProps extends CompletableSlide {
    capacity: number;
    onCapacityChange: (capacity: number) => void;
}

export default Capacity;