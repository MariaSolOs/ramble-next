import type { EventInput } from '@fullcalendar/react';

import Availabilities from './Availabilities';
import type { CompletableSlide } from 'models/application';

export interface AvailabilitiesProps extends CompletableSlide {
    slots: EventInput[];
    onSlotsChange: (slots: EventInput[]) => void;
    duration: number;
}

export default Availabilities;