import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import { BookingType } from 'graphql-server/sdk';
import type { BookingTypeSlideProps } from './index';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import PlusMinusInput from 'components/PlusMinusInput';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import * as S from './BookingTypeSlide.styled';

const BookingTypeSlide = (props: BookingTypeSlideProps) => {
    const { BookExperience_BookingTypeSlide: text } = useLanguageContext().appText;

    const currentGuests = props.experienceCapacity - props.selectedSlot.spotsLeft;
    const privateEnabled = Boolean(props.privatePrice) && currentGuests === 0;

    const { onSlideComplete, bookingType, onBookingTypeChange } = props;
    useEffect(() => {
        onSlideComplete(Boolean(bookingType));
    }, [onSlideComplete, bookingType]);

    // If private bookings are not enabled, pre-select public option
    useEffect(() => {
        if (!props.privatePrice) {
            onBookingTypeChange(BookingType.Public);
        }

        // We can safely assume onBookingType never changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.privatePrice]);

    return (
        <>
            <Box component="h3" sx={{ m: '0 0 1rem', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
                {text.title}
            </Box>
            {privateEnabled &&
                <S.BookingButton 
                selected={props.bookingType === BookingType.Private}
                onClick={() => onBookingTypeChange(BookingType.Private)}>
                    <S.ButtonTitle>
                        {text.privateBookingTitle}
                        <S.Price>${props.privatePrice}</S.Price>
                    </S.ButtonTitle>
                    <S.ButtonText>{text.privateBookingSubtitle}</S.ButtonText>
                    <S.ButtonText>
                        <S.Icon icon={faUsers} />
                        {`${text.upTo} ${props.selectedSlot.spotsLeft} `}
                        {props.selectedSlot.spotsLeft > 1 ? text.people : text.person}
                    </S.ButtonText>
                </S.BookingButton>}
            <S.BookingButton
            selected={props.bookingType === BookingType.Public}
            onClick={() => onBookingTypeChange(BookingType.Public)}>
                <S.ButtonTitle>
                    {props.isOnlineExperience ? 
                        text.publicBookingTitleOnline : text.publicBookingTitle}
                    <S.Price>${props.pricePerPerson}</S.Price>
                </S.ButtonTitle>
                <S.ButtonText>{text.publicBookingSubtitle}</S.ButtonText>
                <S.ButtonText>
                    {currentGuests > 0 ?
                        <>
                            <S.Icon icon={faUsers} />
                            {`${text.join} ${currentGuests} `}
                            {currentGuests > 1 ? text.guests : text.guest}
                        </> : 
                        <>&nbsp;</>}
                </S.ButtonText>
            </S.BookingButton>
            <Collapse
            in={props.bookingType === BookingType.Public}
            sx={{ width: '50%', minWidth: 210 }}>
                <Box component="p" sx={{ textTransform: 'uppercase', color: '#CBCBCB' }}>
                    {text.numberOfGuests}
                </Box>
                <PlusMinusInput
                value={props.numGuests}
                onValueChange={props.onNumGuestsChange}
                step={1}
                minValue={1}
                maxValue={props.selectedSlot.spotsLeft}
                getLabel={num => num > 1 ? text.guests : text.guest} />
            </Collapse>
        </>
    );
}

export default BookingTypeSlide;