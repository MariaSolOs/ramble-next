import type { CompletableSlide } from 'models/application';
import type { Fees } from 'models/experience-interface';
import type { Currency } from 'graphql-server/sdk';
import type { Occurrence } from 'hooks/useBookingReducer';

import PaymentSlide from './PaymentSlide';

export interface PaymentSlideProps extends CompletableSlide {
    email: string;
    zipCode: string;
    selectedDate: string;
    selectedSlot: Occurrence;
    fees: Fees;
    currency: Currency;
    onEmailChange: (email: string) => void;
    onZipCodeChange: (zipCode: string) => void;
}

export default PaymentSlide;