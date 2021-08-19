import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useLanguageContext from 'context/languageContext';
import type { CalendarProps } from './index';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './Calendar.styles';
const useStyles = makeStyles(styles);

const Calendar = (props: CalendarProps) => {
    const { language } = useLanguageContext();
    const classes = useStyles();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const firstDayOfMonth = DateTime.now().startOf('month').toISODate();

    return (
        <div className={classes.calendar}>
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
                    <span 
                    className={classes.slotBullet}
                    style={{
                        backgroundColor: props.bulletMap.get(event.groupId)
                    }} />
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
        </div>
    );
}

export default Calendar;