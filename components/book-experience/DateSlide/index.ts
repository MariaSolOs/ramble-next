import type { CompletableSlide } from 'models/application';

import DateSlide from './DateSlide';

export interface DateSlideProps extends CompletableSlide {
    allowedDates: Set<string>;
    selectedDate?: string;
    onDateSelected: (date: string) => void;
}

export default DateSlide;