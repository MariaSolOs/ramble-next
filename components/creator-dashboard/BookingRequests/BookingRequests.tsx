import type { BookingRequestsProps } from './index';

import BookingCard from 'components/creator-dashboard/BookingCard';
import * as S from './BookingRequests.styled';

const BookingRequests = (props: BookingRequestsProps) => (
    <S.Container>
        {props.requests.map(booking => {
            // Compute the number of guests in confirmed bookings
            const guests = booking.occurrence.bookings.filter(
                ({ paymentCaptured }) => paymentCaptured
            ).map(({ numGuests }) => numGuests);
            const confirmedGuests = guests.length > 0 ? 
                guests.reduce((acc, val) => acc + val) : 0;

            return (
                <BookingCard
                key={booking._id}
                booking={booking}
                confirmedGuests={confirmedGuests}
                onAccept={() => props.onAccept(booking._id)}
                onDecline={() => props.onDecline(booking._id)} />
            );
        })}
    </S.Container>
);

export default BookingRequests;