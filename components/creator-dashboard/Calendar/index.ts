import type { DateTime } from 'luxon';

import type { Occurrence } from 'hooks/useCreatorCalendarReducer';

import Calendar from './Calendar';

export type CalendarProps = {
    bulletMap: Map<string, string>;
    events: Occurrence[];
    onDateSelect: (date: DateTime) => void;
}

export default Calendar;