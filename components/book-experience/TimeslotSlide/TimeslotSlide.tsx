import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import { getTimePieces } from 'lib/date-time';
import type { TimeslotProps, TimeslotSlideProps } from './index';

import Box from '@mui/material/Box';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import * as S from './TimeslotSlide.styled';

const Timeslot = (props: TimeslotProps) => {
    const { BookExperience_TimeslotSlide: text } = useLanguageContext().appText;
    
    const timeDiff = props.timeslot.dateStart.diffNow().as('hours');
    const [startTime, startMeridiem] = getTimePieces(props.timeslot.dateStart);
    const [endTime, endMeridiem] = getTimePieces(props.timeslot.dateEnd);
    const currentGuests = props.experienceCapacity - props.timeslot.spotsLeft; 
    const isOccupied = currentGuests > 0;
    // The timeslot is also disabled if it's happening in an hour
    const isDisabled = currentGuests === props.experienceCapacity || timeDiff <= 1;

    return (
        <S.Slot selected={props.isSelected} disabled={isDisabled} onClick={props.onClick}>
            <S.TimeslotText>
                <S.Icon icon={faClock} />
                {startTime} 
                <S.Meridiem>{startMeridiem}</S.Meridiem> - {endTime}
                <S.Meridiem>{endMeridiem}</S.Meridiem>
            </S.TimeslotText>
            <S.GuestsSlotText>
                {isDisabled ?
                    <>
                        <S.Icon icon={faBan} />
                        {text.bookingUnavailable}
                    </> :
                isOccupied ?
                    <>
                        <S.Icon icon={faUsers} />
                        {`${text.join} ${currentGuests} ${currentGuests === 1 ? 
                        text.guest : text.guests}`}
                    </> :
                    <>
                        <S.Icon icon={faCrown} />
                        {text.firstBooking}
                    </>}
            </S.GuestsSlotText>
        </S.Slot>
    );
}

const TimeslotSlide = (props: TimeslotSlideProps) => {
    const { appText, language } = useLanguageContext();
    const { BookExperience_TimeslotSlide: text } = appText;

    const { onSlideComplete, timeslot, allSlots } = props;
    useEffect(() => {
        onSlideComplete(Boolean(timeslot));
    }, [onSlideComplete, timeslot]);

    // If there's only one available slot, pre-select it
    useEffect(() => {
        if (allSlots.length === 1) {
            const slot = allSlots[0];
            if (slot.spotsLeft !== 0) {
                props.onTimeslotChange(slot);
            }
        }
        /* We don't need to include onTimeslotChange since
        it should never change. */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSlots]);

    const selectedDate = DateTime.fromISO(props.selectedDate).setLocale(language);

    return (
        <>
            <Box component="h3" sx={{ m: '0 0 10px', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                {text.title}
            </Box>
            <S.DateTitle>
                {selectedDate.toFormat('EEEE, MMMM d')}
                <S.YearTitle>{selectedDate.toFormat('y')}</S.YearTitle>
            </S.DateTitle>
            <S.Slots>
                {allSlots.map(slot => 
                    <Timeslot
                    key={uuid()}
                    timeslot={slot}
                    experienceCapacity={props.experienceCapacity}
                    isSelected={slot === timeslot}
                    onClick={() => {
                        props.onTimeslotChange(slot);
                    }} />
                )}
            </S.Slots>
        </>
    );
}

export default TimeslotSlide;