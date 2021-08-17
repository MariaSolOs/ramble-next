import type { BookingRequestsProps } from './index';

import BookingCard from 'components/creator-dashboard/BookingCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BookingRequests.styles';
const useStyles = makeStyles(styles);

const BookingRequests = (props: BookingRequestsProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
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
        </div>
    );
}

export default BookingRequests;