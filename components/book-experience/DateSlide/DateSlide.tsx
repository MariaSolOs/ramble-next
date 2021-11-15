import { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
 
import useLanguageContext from 'context/languageContext';
import type { DateSlideProps } from './index';

import * as S from './DateSlide.styled';

const getDateString = (date: Date) => date.toISOString().split('T')[0];

const DateSlide = (props: DateSlideProps) => {
    const { BookExperience_DateSlide: text } = useLanguageContext().appText;

    const { onSlideComplete, selectedDate } = props;
    useEffect(() => {
        onSlideComplete(Boolean(selectedDate));
    }, [onSlideComplete, selectedDate]);
    
    return (
        <>  
            <S.Title>{text.title}</S.Title>
            <S.Calendar>
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
                        isBookable ? 'bookable-date' : 'fc-day-disabled',
                        dateString === selectedDate ? 'selected-date' : ''
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
                <S.TimezoneMessage>{text.timezoneMessage}</S.TimezoneMessage>
            </S.Calendar>
        </>
    );
}

export default DateSlide;