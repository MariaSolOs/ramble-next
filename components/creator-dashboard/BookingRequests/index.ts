import BookingRequests from './BookingRequests';
import type { BookingCardFragment as Booking } from 'graphql-server/sdk';

export type BookingRequestsProps = {
    requests: Booking[];
    onAccept: (bookingId: string) => void;
    onDecline: (bookingId: string) => void;
}

export default BookingRequests;