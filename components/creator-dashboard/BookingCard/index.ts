import type React from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

import type { BookingCardFragment as Booking } from 'graphql-server/sdk';

import BookingCard from './BookingCard';

export type BookingCardProps = {
    booking: Booking;
    confirmedGuests: number;
    onAccept: React.MouseEventHandler<HTMLButtonElement>;
    onDecline: React.MouseEventHandler<HTMLButtonElement>;
}

export type InfoItemProps = {
    icon: IconProp;
}

export default BookingCard;