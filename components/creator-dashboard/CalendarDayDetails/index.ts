import type { DateTime } from 'luxon';

import CalendarDayDetails from './CalendarDayDetails';
import type { Occurrence } from 'hooks/useCreatorCalendarReducer';

export type CalendarDayDetailsProps = {
    day: DateTime;
    daySlots: Occurrence[];
    bulletMap: Map<string, string>;
    isDialogOpen: boolean;
    onCloseDialog: () => void;
    onDeleteSlot: (slotId: string) => void;
}

export default CalendarDayDetails;