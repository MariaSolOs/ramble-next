import React from 'react';
import { DateTime } from 'luxon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useLanguageContext from 'context/languageContext';
import { getTimePieces } from 'lib/date-time';
import { BookingType } from 'graphql-server/sdk';
import type { BookingCardProps, InfoItemProps } from './index';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign';
import * as S from './BookingCard.styled';

const InfoItem: React.FC<InfoItemProps> = (props) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <S.InfoIcon><S.Icon icon={props.icon} /></S.InfoIcon>
        <S.InfoText component="p">{props.children}</S.InfoText>
    </Box>
);

const BookingCard = (props: BookingCardProps) => {
    const { appText, language } = useLanguageContext();
    const { BookingCard: text } = appText;

    const booking = props.booking;
    const occurrence = props.booking.occurrence;
    const experience = props.booking.occurrence.experience;
    const client = props.booking.client;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <S.Card>
            <Box sx={{ mb: '1rem', p: '0 10px' }}>
                <S.GreyText component="time" sx={{ textTransform: 'capitalize' }}>
                    {bookingDate}
                </S.GreyText>
                <S.GreyText component="time">{bookingTime}</S.GreyText>
                <Box component="h4" sx={{ m: 0, fontSize: '1.15rem' }}>
                    {text.fromTitle} {client.firstName}
                </Box>
            </Box>
            <S.Body>
                {booking.bookingType === BookingType.Private &&
                    <S.Private>
                        <S.Icon icon={faCrown} />
                        {text.privateBooking}
                    </S.Private>}
                <S.ClientInfo>
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
                        <Box 
                        component="p" 
                        sx={{ 
                            fontSize: '1.1rem',
                            m: Boolean(client.city) ? '0 0 -4px 8px' : '0 0 0 8px'
                        }}>
                            {client.firstName}
                        </Box>
                        <S.GreyText component="p">{client.city}</S.GreyText>
                    </div>
                </S.ClientInfo>
                <S.InfoRow>
                    <InfoItem icon={faClock}>
                        <S.LargeNum>{startTime}</S.LargeNum>{startMeridiem} -
                        <S.LargeNum>{endTime}</S.LargeNum>{endMeridiem}
                    </InfoItem>
                    <InfoItem icon={faUsers}>
                        <S.LargeNum>{booking.numGuests}</S.LargeNum>
                        {!isMobile && (booking.numGuests > 1 ? text.guests : text.guest)}
                    </InfoItem>
                    <InfoItem icon={faDollarSign}>
                        $<S.LargeNum>{bookingProfit}</S.LargeNum>
                    </InfoItem>
                </S.InfoRow>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: '1rem' }}>
                    <S.ExperienceImgContainer>
                        <Image
                        src={experience.images[0].src}
                        alt={experience.title}
                        layout="fill"
                        objectFit="cover"
                        className="next-image"
                        placeholder="blur"
                        blurDataURL={experience.images[0].placeholder} />
                    </S.ExperienceImgContainer>
                    <Box component="p" sx={{ m: 0, fontSize: '1.1rem' }}>
                        {experience.title}
                    </Box>
                </Box>
                <S.GreyText component="p">{text.currentlyFor}</S.GreyText>
                <S.InfoText component="p">{occurrenceDate}</S.InfoText>
                <S.InfoRow>
                    <InfoItem icon={faUsers}>
                        {`${props.confirmedGuests} / ${experience.capacity} ${text.guests}`}
                    </InfoItem>
                    <S.GreyText component="p">
                        {`${text.currentPayment} `}
                        <S.InfoText component="span">
                            $<S.LargeNum>{currentProfit}</S.LargeNum>
                        </S.InfoText>
                    </S.GreyText>
                </S.InfoRow>
                <S.Actions>
                    <S.Button onClick={props.onAccept} variant="accept">
                        {text.accept}
                    </S.Button>
                    <S.Button onClick={props.onDecline} variant="decline">
                        {text.decline}
                    </S.Button>
                </S.Actions>
            </S.Body>
        </S.Card>
    );
}

export default React.memo(BookingCard);