import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useLanguageContext from 'context/languageContext';
import type { CalendarProps } from './index';

import * as S from './Calendar.styled';

// FIXME Warning: Prop `id` did not match. Server: "fc-dom-1" Client: "fc-dom-2"
const Calendar = (props: CalendarProps) => {
    const { language } = useLanguageContext();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const firstDayOfMonth = DateTime.now().startOf('month').toISODate();

    return (
        <S.Calendar>
            <FullCalendar
            plugins={[ 
                dayGridPlugin,
                interactionPlugin
            ]}
            // Use Montreal's timezone
            timeZone="America/Toronto"
            locale={language}
            initialView="dayGridMonth"
            selectable
            eventContent={({ event }) => (
                <>
                    <S.SlotBullet 
                    sx={{ backgroundColor: props.bulletMap.get(event.groupId) }} />
                    {event.title}
                </>
            )}
            eventDisplay="list-item"
            events={props.events}
            eventClick={({ event }) => {
                props.onDateSelect(DateTime.fromISO(event.startStr));
            }}
            height="100%"
            longPressDelay={50}
            select={({ startStr }) => {
                props.onDateSelect(DateTime.fromISO(startStr));
            }}
            headerToolbar={{
                start: '',
                center: '',
                end: 'title prev next'
            }}
            validRange={{ start: firstDayOfMonth }} 
            fixedWeekCount
            moreLinkClick={({ date }) => {
                props.onDateSelect(DateTime.fromJSDate(date));
                return 'month';
            }}
            dayMaxEvents={isMobile ? 2 : 3} />
        </S.Calendar>
    );
}

export default Calendar;