import type { CompletableSlide } from 'models/application';
import type { BookingType } from 'models/experience-interface';
import type { Occurrence } from 'hooks/useBookingReducer';

import BookingTypeSlide from './BookingTypeSlide';

export interface BookingTypeSlideProps extends CompletableSlide {
    bookingType?: BookingType;
    numGuests: number;
    pricePerPerson: number;
    privatePrice?: number;
    selectedSlot: Occurrence;
    experienceCapacity: number;
    isOnlineExperience: boolean;
    onBookingTypeChange: (type: BookingType) => void;
    onNumGuestsChange: (num: number) => void;
}


export default BookingTypeSlide;