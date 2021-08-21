import type { DateTime } from 'luxon';

import type { Occurrence } from 'hooks/useCreatorCalendarReducer';

import CalendarDayDetails from './CalendarDayDetails';

export type CalendarDayDetailsProps = {
    day: DateTime;
    daySlots: Occurrence[];
    bulletMap: Map<string, string>;
    isDialogOpen: boolean;
    onCloseDialog: () => void;
    onDeleteSlot: (slotId: string) => void;
}

export default CalendarDayDetails;