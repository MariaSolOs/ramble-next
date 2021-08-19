import type { DateTime } from 'luxon';

import Calendar from './Calendar';
import type { Occurrence } from 'hooks/useCreatorCalendarReducer';

export type CalendarProps = {
    bulletMap: Map<string, string>;
    events: Occurrence[];
    onDateSelect: (date: DateTime) => void;
}

export default Calendar;