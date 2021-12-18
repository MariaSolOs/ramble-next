import type { EventInput } from '@fullcalendar/react';

import type { CompletableSlide } from 'models/application';

import Availabilities from './Availabilities';

export interface AvailabilitiesProps extends CompletableSlide {
    slots: EventInput[];
    onSlotsChange: (slots: EventInput[]) => void;
    duration: number;
}

export default Availabilities;