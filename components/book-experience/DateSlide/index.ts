import DateSlide from './DateSlide';
import type { CompletableSlide } from 'models/application';

export interface DateSlideProps extends CompletableSlide {
    allowedDates: Set<string>;
    selectedDate?: string;
    onDateSelected: (date: string) => void;
}

export default DateSlide;