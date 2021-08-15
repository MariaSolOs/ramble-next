import { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
 
import useLanguageContext from 'context/languageContext';
import type { DateSlideProps } from './index';

import { makeStyles } from '@material-ui/core/styles';
import styles from './DateSlide.styles';
const useStyles = makeStyles(styles);

const getDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
}

const DateSlide = (props: DateSlideProps) => {
    const { BookExperience_DateSlide: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { onSlideComplete, selectedDate } = props;
    useEffect(() => {
        onSlideComplete(Boolean(selectedDate));
    }, [onSlideComplete, selectedDate]);
    
    return (
        <>
            <h3 className={classes.title}>{text.title}</h3>
            <div className={classes.calendar}>
                <FullCalendar
                plugins={[ 
                    dayGridPlugin,
                    interactionPlugin
                ]}
                height={350}
                // Use Montreal's timezone
                timeZone="America/Toronto"
                initialView="dayGridMonth"
                longPressDelay={10}
                selectable
                select={({ startStr }) => {
                    const dateStr = startStr.split('T')[0];
                    if (props.allowedDates.has(dateStr)) {
                        props.onDateSelected(dateStr);
                    }
                }}
                dayCellClassNames={({ date }) => {
                    const dateString = getDateString(date);
                    const isBookable = props.allowedDates.has(
                        dateString
                    );
                    return [
                        isBookable ? classes.bookableDate : 'fc-day-disabled',
                        dateString === selectedDate ? classes.selectedDate : ''
                    ]
                }}
                headerToolbar={{
                    start: '',
                    center: 'prev title next',
                    end: ''
                }}
                dayHeaderFormat={{
                    weekday: 'narrow'
                }}
                validRange={{ start: new Date() }} 
                fixedWeekCount />
                <p className={classes.timezoneMessage}>
                    {text.timezoneMessage}
                </p>
            </div>
        </>
    );
}

export default DateSlide;