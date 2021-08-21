import type { BookingCardFragment as Booking } from 'graphql-server/sdk';

import BookingRequests from './BookingRequests';

export type BookingRequestsProps = {
    requests: Booking[];
    onAccept: (bookingId: string) => void;
    onDecline: (bookingId: string) => void;
}

export default BookingRequests;