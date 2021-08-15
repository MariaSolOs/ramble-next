import PaymentSlide from './PaymentSlide';
import type { CompletableSlide } from 'models/application';
import type { Currency, Fees } from 'models/experience-interface';
import type { Occurrence } from 'hooks/useBookingReducer';

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