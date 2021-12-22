import { DateTime } from 'luxon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useLanguageContext from 'context/languageContext';
import { BookingType } from 'graphql-server/sdk';
import type { CalendarDayDetailsProps } from './index';

import Image from 'next/image';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import * as S from './CalendarDayDetails.styled';

const CalendarDayDetails = (props: CalendarDayDetailsProps) => {
    const { appText, language } = useLanguageContext();
    const { CreatorCalendar: text } = appText;
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dayDetailTitle = DateTime.now().hasSame(props.day, 'day') ?
        text.today : props.day.setLocale(language).toLocaleString(DateTime.DATE_HUGE);

    const dayDetails = (
        <S.Container>
            <S.Title>
                {dayDetailTitle}
                {isMobile &&
                    <S.CloseDialogButton onClick={props.onCloseDialog}>
                        {text.closeDialog}
                    </S.CloseDialogButton>}
            </S.Title>
            {props.daySlots.map(slot => {
                const hasBookings = slot.numGuests > 0;
                const dateStart = slot.dateStart.toLocaleString(DateTime.TIME_SIMPLE);
                const dateEnd = slot.dateEnd.toLocaleString(DateTime.TIME_SIMPLE);

                return (
                    <S.Slot key={slot.id}>
                        <S.SlotInfo sx={{ m: 0 }}>{`${dateStart} - ${dateEnd}`}</S.SlotInfo>
                        <S.SlotTitle>
                            <S.SlotBullet 
                            sx={{ backgroundColor: props.bulletMap.get(slot.groupId!) }} />
                            {slot.title}
                        </S.SlotTitle>
                        {hasBookings &&
                            <>
                                <S.SlotInfo>
                                    {`${slot.numGuests} ${hasBookings ? text.guests : text.guest}`}
                                </S.SlotInfo>
                                <S.ClientList>
                                    {slot.bookings.map(booking =>
                                        <S.ClientItem key={booking._id}>
                                            {booking.bookingType === BookingType.Private &&
                                                <S.PrivateBooking>
                                                    <Box 
                                                    component={FontAwesomeIcon}
                                                    icon={faCrown}
                                                    sx={{ fontSize: '1rem' }} />
                                                    {text.private}
                                                </S.PrivateBooking>}
                                            <S.ClientAvatar>
                                                {booking.clientPhoto?.src ? 
                                                    <Image
                                                    src={booking.clientPhoto.src}
                                                    alt={booking.clientName}
                                                    width={30}
                                                    height={30}
                                                    placeholder="blur"
                                                    blurDataURL={booking.clientPhoto.placeholder} /> :
                                                    booking.clientName.charAt(0)}
                                            </S.ClientAvatar>
                                            {`${booking.clientName} (${booking.numGuests})`}
                                            {booking.clientPhone && 
                                                <Box component="span" sx={{ ml: '20px' }}>
                                                    <Box 
                                                    component={FontAwesomeIcon}
                                                    icon={faPhoneAlt}
                                                    sx={{ mr: '5px' }} />
                                                    {booking.clientPhone}
                                                </Box>}
                                        </S.ClientItem>
                                    )}
                                </S.ClientList>
                            </>}
                        {(!hasBookings || slot.bookings[0].bookingType === 'public') &&
                            <S.DeleteSlotButton 
                            onClick={() => props.onDeleteSlot(slot.id!)}
                            disabled={hasBookings} />}
                    </S.Slot>
                );
            })}
        </S.Container>
    );

    if (isMobile) {
        return (
            <S.Dialog 
            fullWidth
            open={props.isDialogOpen}
            maxWidth="xs"
            onClose={props.onCloseDialog}>
                {dayDetails}
            </S.Dialog>
        );
    } else {
        return dayDetails;
    }
}

export default CalendarDayDetails;