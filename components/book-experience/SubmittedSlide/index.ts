import type { DateTime } from 'luxon';

import type { Currency } from 'models/experience-interface';
import type { Image } from 'models/files';

import SubmittedSlide from './SubmittedSlide';

export type SubmittedSlideProps = {
    startDate: DateTime;
    endDate: DateTime;
    numGuests: number;
    cardBrand: string;
    cardLast4: string;
    totalPrice: number;
    currency: Currency;
    experience: {
        title: string;
        image: Image;
        toBring: string[];
        meetingPoint?: string;
    }
    host: {
        name: string;
        photo: Image;
        phoneNumber: string;
    }
}

export default SubmittedSlide;