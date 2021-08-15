import Layout from './Layout';
import type { Experience } from 'models/experience-interface';
import type { BookingStep } from 'hooks/useBookingReducer';

export type LayoutProps = {
    experience: Experience;
    currentStep: BookingStep;
    nextButtonWidth?: number | string;
    bookingPrice?: number;
    canContinue: boolean;
    onGoBack: () => void;
    onGoNext: () => void;
}

export type LayoutStyleProps = {
    nextButtonWidth: number | string;
}

export default Layout;