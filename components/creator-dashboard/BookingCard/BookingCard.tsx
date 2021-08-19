import React from 'react';
import { DateTime } from 'luxon';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useLanguageContext from 'context/languageContext';
import { getTimePieces } from 'lib/date-time';
import type { BookingCardProps } from './index';

import Image from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './BookingCard.styles';
const useStyles = makeStyles(styles);

const BookingCard = React.memo((props: BookingCardProps) => {
    const { appText, language } = useLanguageContext();
    const { BookingCard: text } = appText;

    const booking = props.booking;
    const occurrence = props.booking.occurrence;
    const experience = props.booking.occurrence.experience;
    const client = props.booking.client;

    const classes = useStyles({ hasClientCity: Boolean(client.city) });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    // Transform the prices to dollars since they come in cents
    const bookingProfit = (booking.creatorProfit / 100).toFixed(2);
    const currentProfit = (occurrence.creatorProfit / 100).toFixed(2);

    // Format dates and times nicely
    const bookingDate = DateTime.fromISO(booking.createdAt).setLocale(language).toLocaleString(DateTime.DATE_HUGE);
    const bookingTime = DateTime.fromISO(booking.createdAt).toLocaleString(DateTime.TIME_SIMPLE);
    const occurrenceDate = DateTime.fromISO(occurrence.dateStart).setLocale(language).toLocaleString(DateTime.DATE_HUGE);
    const [startTime, startMeridiem] = getTimePieces(DateTime.fromISO(occurrence.dateStart));
    const [endTime, endMeridiem] = getTimePieces(DateTime.fromISO(occurrence.dateEnd));

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <time className={classes.greyText}>{bookingDate}</time>
                <time className={classes.greyText}>{bookingTime}</time>
                <h4 className={classes.bookingTitle}>
                    {text.fromTitle} {client.firstName}
                </h4>
            </div>
            <div className={classes.body}>
                {booking.bookingType === 'private' &&
                    <div className={classes.private}>
                        <FontAwesomeIcon className={classes.icon} icon={faCrown} />
                        {text.privateBooking}
                    </div>}
                <div className={classes.clientInfo}>
                    <Avatar>
                        {client.photo?.src ? 
                            <Image
                            src={client.photo?.src}
                            alt={client.firstName}
                            width={40}
                            height={40}
                            placeholder="blur"
                            blurDataURL={client.photo?.placeholder} /> :
                            client.firstName.charAt(0)}
                    </Avatar>
                    <div>
                        <p className={classes.clientName}>{client.firstName}</p>
                        <p className={classes.greyText}>{client.city}</p>                        
                    </div>
                </div>
                <div className={classes.infoRow}>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faClock} />
                        </div>
                        <p className={classes.infoText}>
                            <span className={classes.largeNum}>{startTime}</span> 
                            {startMeridiem} -
                            <span className={classes.largeNum}>{endTime}</span>{endMeridiem}
                        </p>
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                        </div>
                        <p className={classes.infoText}>
                            <span className={classes.largeNum}>{booking.numGuests}</span> 
                            {!isMobile && (booking.numGuests > 1 ? text.guests : text.guest)}
                        </p>
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faDollarSign} />
                        </div>
                        <p className={classes.infoText}>
                            $<span className={classes.largeNum}>{bookingProfit}</span> 
                        </p>
                    </div>
                </div>
                <div className={classes.experienceInfo}>
                    <div className={classes.experienceImgContainer}>
                        <Image
                        src={experience.images[0].src}
                        alt={experience.title}
                        layout="fill"
                        objectFit="cover"
                        className={classes.experienceImg}
                        placeholder="blur"
                        blurDataURL={experience.images[0].placeholder} />
                    </div>
                    <p className={classes.experienceTitle}>{experience.title}</p>
                </div>
                <p className={classes.greyText}>{text.currentlyFor}</p>
                <p className={classes.infoText}>{occurrenceDate}</p>
                <div className={classes.infoRow}>
                    <div className={classes.infoContainer}>
                        <div className={classes.iconContainer}>
                            <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                        </div>
                        <p className={classes.infoText}>
                            {`${props.confirmedGuests} / ${experience.capacity} ${text.guests}`}
                        </p>
                    </div>
                    <p className={classes.greyText}>
                        {`${text.currentPayment} `}
                        <span className={classes.infoText}>
                            $<span className={classes.largeNum}>{currentProfit}</span>
                        </span>
                    </p>
                </div>
                <div className={classes.actions}>
                    <button 
                    className={`${classes.button} ${classes.acceptButton}`}
                    onClick={props.onAccept}>
                        {text.accept}
                    </button>
                    <button 
                    className={`${classes.button} ${classes.declineButton}`}
                    onClick={props.onDecline}>
                        {text.decline}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default BookingCard;