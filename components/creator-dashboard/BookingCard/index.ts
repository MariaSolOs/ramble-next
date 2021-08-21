import type React from 'react';

import type { BookingCardFragment as Booking } from 'graphql-server/sdk';

import BookingCard from './BookingCard';

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