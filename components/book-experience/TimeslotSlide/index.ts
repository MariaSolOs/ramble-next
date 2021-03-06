import type { Occurrence } from 'hooks/useBookingReducer';
import type { CompletableSlide } from 'models/application';

import TimeslotSlide from './TimeslotSlide';

export interface TimeslotSlideProps extends CompletableSlide {
    selectedDate: string;
    timeslot?: Occurrence;
    allSlots: Occurrence[];
    experienceCapacity: number;
    onTimeslotChange: (slot: Occurrence) => void;
}

export type TimeslotProps = {
    timeslot: Occurrence;
    experienceCapacity: number;
    isSelected: boolean;
    onClick: () => void;
}

export default TimeslotSlide;