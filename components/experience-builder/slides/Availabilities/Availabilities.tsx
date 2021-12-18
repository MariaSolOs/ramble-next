import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import useLanguageContext from 'context/languageContext';
import type { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react';
import type { AvailabilitiesProps } from './index';

import * as S from './Availabilities.styled';

/**
 * @param time1 - Start time of the slot
 * @param time2 - End time of the slot
 * @param numHours - The experience's duration in hours
 * @returns True if the slot has a valid duration
 */
const isSlotValid = (time1: Date, time2: Date, numHours: number) => {
    const hours = Math.floor(numHours);
    const halfHour = numHours - Math.floor(numHours);

    let ms = hours * 60 * 60 * 1000;
    if (halfHour) {
        ms += 30 * 60 * 1000;
    }

    return time2.getTime() - time1.getTime() === ms;
}

const Availabilities = (props: AvailabilitiesProps) => {
    const { appText, language } = useLanguageContext();
    const { BuilderSlides_Availabilities: text } = appText;

    // Creators must commit to host at least once
    const { onSlideComplete, slots } = props;
    useEffect(() => {
        onSlideComplete(slots.length >= 1);
    }, [onSlideComplete, slots]);

    const handleSelect = (info: DateSelectArg) => {
        if (info.allDay) {
            // When selecting on a date, change view to day grid
            info.view.calendar.changeView('timeGridDay', info.start.toISOString());
        } else {
            // Create new slot
            const newSlot = info as EventInput;
            newSlot.id = uuid();
            props.onSlotsChange([ ...slots, newSlot ]);
        }
    }

    const handleUnselect = (info: EventClickArg) => {
        // Only delete when in day grid mode
        if (info.view.type === 'timeGridDay') {
            props.onSlotsChange(slots.filter(({ id }) =>
                id !== info.event.id
            ));
        }
    }
    
    return (
        <S.PageContainer>
            <S.Instructions>
                <S.Title>{text.title}</S.Title>
                <S.Subtitle>{text.subtitle}</S.Subtitle>
                <S.Tip >{text.tip1}</S.Tip>
                <S.Tip >{text.tip2}</S.Tip>
                <S.Tip >{text.timezoneMessage}</S.Tip>
            </S.Instructions>
            <S.Calendar>
                <FullCalendar
                plugins={[ 
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin
                ]}
                // Use Montreal's timezone
                timeZone="America/Toronto"
                locale={language}
                initialView="dayGridMonth"
                selectable
                eventClick={handleUnselect}
                eventTextColor="#2B2B2B"
                eventColor="#ECEBE5"
                events={slots}
                height={500}
                scrollTimeReset={false}
                longPressDelay={50}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                }}
                selectAllow={info => {
                    // Allow clicking on a date or a single slot
                    return info.allDay ? 
                        true : isSlotValid(info.start, info.end, props.duration); 
                }}
                select={handleSelect}
                headerToolbar={{
                    center: 'dayGridMonth timeGridDay',
                    end: 'prev next'
                }}
                buttonText={{
                    today: text.today,
                    month: text.month,
                    day: text.day
                }}
                validRange={{ start: new Date() }} 
                fixedWeekCount
                allDaySlot={false}
                slotDuration="00:30"
                // Creators start hosting at 8am, and end at midnight
                slotMinTime="08:00"
                dayMaxEvents={2}
                moreLinkClick={() => 'day'} />
            </S.Calendar>
        </S.PageContainer>
    );
}

export default Availabilities;