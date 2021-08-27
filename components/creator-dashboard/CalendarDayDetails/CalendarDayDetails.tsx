import { DateTime } from 'luxon';
import { useMediaQuery } from '@material-ui/core';

import useLanguageContext from 'context/languageContext';
import { BookingType } from 'graphql-server/sdk';
import type { CalendarDayDetailsProps } from './index';

import Image from 'next/image';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './CalendarDayDetails.styles';
const useStyles = makeStyles(styles);

const CalendarDayDetails = (props: CalendarDayDetailsProps) => {
    const { appText, language } = useLanguageContext();
    const { CreatorCalendar: text } = appText;
    const theme = useTheme();
    const classes = useStyles();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dayDetailTitle = DateTime.now().hasSame(props.day, 'day') ?
        text.today : props.day.setLocale(language).toLocaleString(DateTime.DATE_HUGE);

    const dayDetails = (
        <div className={classes.root}>
            <h3 className={classes.title}>
                {dayDetailTitle}
                {isMobile && 
                    <button 
                    className={classes.closeDialogButton} 
                    onClick={props.onCloseDialog}>
                        {text.closeDialog}
                    </button>}
            </h3>
            {props.daySlots.map(slot => {
                const hasBookings = slot.numGuests > 0;
                const dateStart = slot.dateStart.toLocaleString(DateTime.TIME_SIMPLE);
                const dateEnd = slot.dateEnd.toLocaleString(DateTime.TIME_SIMPLE);

                return (
                    <div key={slot.id} className={classes.slotContainer}>
                    <p className={classes.slotInfo}>{`${dateStart} - ${dateEnd}`}</p>
                    <h3 className={classes.slotTitle}> 
                        <span 
                        className={classes.slotBullet}
                        style={{ backgroundColor: props.bulletMap.get(slot.groupId!) }} /> 
                        {slot.title}
                    </h3>
                    {hasBookings &&
                    <>
                        <p className={classes.slotInfo}>
                            {`${slot.numGuests} ${
                            hasBookings ? text.guests : text.guest}`}
                        </p>
                        <ul className={classes.clientList}>
                            {slot.bookings.map(booking =>
                                <li key={booking._id} className={classes.clientItem}>
                                    {booking.bookingType === BookingType.Private &&
                                        <div className={classes.privateBooking}>
                                            <FontAwesomeIcon 
                                            icon={faCrown}
                                            className={classes.privateIcon} />
                                            {text.private}
                                        </div>}
                                    <Avatar className={classes.clientAvatar}>
                                        {booking.clientPhoto?.src ? 
                                        <Image
                                        src={booking.clientPhoto.src}
                                        alt={booking.clientName}
                                        width={30}
                                        height={30}
                                        placeholder="blur"
                                        blurDataURL={booking.clientPhoto.placeholder} /> :
                                        booking.clientName.charAt(0)}
                                    </Avatar>
                                    {`${booking.clientName} (${booking.numGuests})`}
                                    {booking.clientPhone && 
                                        <span className={classes.clientPhone}>
                                            <FontAwesomeIcon 
                                            icon={faPhoneAlt} 
                                            className={classes.phoneIcon} />
                                            {booking.clientPhone}
                                        </span>}
                                </li>
                            )}
                        </ul>
                    </>}
                    {(!hasBookings || slot.bookings[0].bookingType === 'public') &&
                    <HighlightOffIcon 
                    onClick={() => props.onDeleteSlot(slot.id!)}
                    className={`
                        ${classes.deleteSlotButton}
                        ${hasBookings && classes.disabledDelete}
                    `} />}
                </div>
            )})}
        </div>          
    );

    if (isMobile) {
        return (
            <Dialog 
            open={props.isDialogOpen}
            fullWidth
            maxWidth="xs"
            className={classes.dialog}
            onClose={props.onCloseDialog}>
                {dayDetails}
            </Dialog>
        );
    } else {
        return dayDetails;
    }
}

export default CalendarDayDetails;