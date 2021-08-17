import React from 'react';

import BookingCard from './BookingCard';
import type { BookingCardFragment as Booking } from 'graphql-server/sdk';

export type BookingCardProps = {
    booking: Booking;
    confirmedGuests: number;
    onAccept: React.MouseEventHandler<HTMLButtonElement>;
    onDecline: React.MouseEventHandler<HTMLButtonElement>;
}

export type BookingCardStyleProps = {
    hasClientCity: boolean;
}

export default BookingCard;