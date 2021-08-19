import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import useUiContext from 'context/uiContext';
import useLanguageContext from 'context/languageContext';
import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import BookingRequests from 'components/creator-dashboard/BookingRequests';
import DashboardLayout from 'components/creator-dashboard/DashboardLayout';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const BookingRequestsPage: Page = () => {
    const { BookingRequests: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const [session, loading] = useSession();
    const router = useRouter();

    const [processing, setProcessing] = useState(false);

    const { data, mutate } = sdk.useGetBookingRequests(session ? 'getBookingRequests' : null, {
        userId: session?.user.userId || ''
    }, { onError: () => handleError("We couldn't get your bookings...") });

    // Make sure user is logged in and a creator
    useEffect(() => {
        if (!loading && (!session || !session.user.creatorId)) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, loading, router, uiDispatch]);

    const handleError = useCallback((message: string) => {
        uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
    }, [uiDispatch]);

    const handleDecision = useCallback(async (action: 'capture' | 'cancel', bookingId: string) => {
        setProcessing(true);
 
        const res = await fetch(`/api/stripe/payment-intent/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ bookingId })
        });

        if (res.ok) {
            const message = action === 'capture' ? 
                text.bookingAcceptedMessage : text.bookingRejectedMessage;
            uiDispatch({ type: 'OPEN_SNACKBAR', message });
            mutate();
        } else {
            handleError(text.decisionError);
        }

        setProcessing(false);
    }, [uiDispatch, handleError, text, mutate]);

    return (
        <>  
            {(!data || processing) && <Spinner />}
            <BookingRequests 
            requests={data?.me.creator?.bookingRequests! || []}
            onAccept={id => handleDecision('capture', id)}
            onDecline={id => handleDecision('cancel', id)} />
        </>
    );
}

BookingRequestsPage.displayName = 'BookingRequestsPage';
BookingRequestsPage.layout = DashboardLayout;

export default BookingRequestsPage;