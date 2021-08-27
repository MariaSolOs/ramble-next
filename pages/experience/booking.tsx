import { useEffect, useCallback } from 'react';
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import useBookingReducer from 'hooks/useBookingReducer';
import useUiContext from 'context/uiContext';
import { getSdkWithHooks, BookingType } from 'graphql-server/sdk';
import { getGraphQLClient } from 'lib/graphql';
import { getFeesBreakdown } from 'lib/booking';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import Layout from 'components/book-experience/Layout';
import DateSlide from 'components/book-experience/DateSlide';
import TimeslotSlide from 'components/book-experience/TimeslotSlide';
import BookingTypeSlide from 'components/book-experience/BookingTypeSlide';
import PaymentSlide from 'components/book-experience/PaymentSlide';
import SubmittedSlide from 'components/book-experience/SubmittedSlide';

const graphqlClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphqlClient);

const BookExperiencePage: Page = () => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const { uiDispatch } = useUiContext();
    
    const [state, dispatch] = useBookingReducer();
    // Fetch the information of the current logged in user
    const [session] = useSession();
    const isLoggedIn = Boolean(session);
    const userEmail = session?.user.email || '';

    // Retrieve experience ID from query
    const experienceId = router.query.expid as string;

    // Get the experience for the preview
    sdk.useGetBookingExperience(experienceId ? 'getBookingExperience' : null, { id: experienceId }, {
        onSuccess: ({ experiencesById }) => {
            dispatch({ 
                type: 'SET_EXPERIENCE', 
                experienceData: experiencesById[0] 
            });
        },
        onError: () => handleError("We can't complete your booking right now...")
    });

    // Get occurrences
    sdk.useGetBookingOccurrences(experienceId ? 'getBookingOccurrences' : null, { experienceIds: [experienceId] }, {
        onSuccess: (occurrences) => {
            dispatch({ type: 'SET_OCCURRENCES', occurrences });
        },
        onError: () => handleError("We can't complete your booking right now...")
    });

    // Pre-fill the email field with the stored one
    useEffect(() => {
        dispatch({ type: 'SET_EMAIL', email: userEmail });
    }, [userEmail, dispatch]);

    // If the user isn't logged in, prompt sign up before payment
    useEffect(() => {
        if (state.step === 'payment' && !isLoggedIn) {
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
            dispatch({ type: 'GO_BACK' });
        }
    }, [state.step, isLoggedIn, uiDispatch, dispatch]);

    // Keep the fees updated
    useEffect(() => {
        if (state.experience &&
            state.form.bookingType &&
            state.form.numGuests) {
            const price = state.form.bookingType === BookingType.Public ?
                state.experience.pricePerPerson : state.experience.privatePrice!;
            const fees = getFeesBreakdown(
                price,
                state.experience.isOnlineExperience,
                state.form.bookingType!,
                state.form.numGuests
            );
            dispatch({ type: 'SET_FEES', fees });
        }

    }, [state.experience, state.form.bookingType, state.form.numGuests, dispatch]);

    const handleError = useCallback((message: string = "Something went wrong...") => {
        uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        router.push('/');
    }, [uiDispatch, router]);

    const handleContinue = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    const handleSubmit = async () => {
        // Make sure Stripe is loaded properly
        if (!stripe || !elements) {
            return;
        }

        dispatch({ type: 'INIT_SUBMIT' });

        // Get the client secret
        const response = await fetch(`/api/stripe/payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                experienceId,
                bookingType: state.form.bookingType!,
                numGuests: state.form.numGuests
            })
        }).then(res => res.json());

        // Confirm the payment intent
        const result = await stripe.confirmCardPayment(response.clientSecret, {
            receipt_email: state.form.email,
            payment_method: {
                card: elements.getElement(CardNumberElement)!,
                billing_details: {
                    address: {
                        postal_code: state.form.zipCode
                    }
                }
            }
        });

        // Check possible errors
        if (result.error) {
            return handleError(result.error.message);
        } else if (result.paymentIntent.status !== 'requires_capture') {
            return handleError("Your payment couldn't be processed.");
        }

        // Create booking
        const bookingData = await sdk.createBooking({
            occurrenceId: state.form.timeslot!.id!,
            bookingType: state.form.bookingType!,
            numGuests: state.form.numGuests,
            paymentIntentId: result.paymentIntent.id
        });

        dispatch({ type: 'SET_BOOKING_DATA', data: bookingData });
    }

    const getSlideContent = () => {
        switch (state.step) {
            case 'date': 
                return (
                    <DateSlide
                    allowedDates={new Set(state.occurrences.keys())}
                    selectedDate={state.form.date}
                    onDateSelected={date => {
                        dispatch({ type: 'SET_DATE', date });
                    }}
                    onSlideComplete={handleContinue} />
                );
            case 'time':
                return (
                    <TimeslotSlide
                    selectedDate={state.form.date!}
                    timeslot={state.form.timeslot}
                    allSlots={state.occurrences.get(state.form.date!)!}
                    experienceCapacity={state.experience!.capacity}
                    onTimeslotChange={timeslot => {
                        dispatch({ type: 'SET_TIMESLOT', timeslot });
                    }}
                    onSlideComplete={handleContinue} />
                );
            case 'bookingType':
                return (
                    <BookingTypeSlide
                    bookingType={state.form.bookingType}
                    numGuests={state.form.numGuests}
                    pricePerPerson={state.experience!.pricePerPerson}
                    privatePrice={state.experience!.privatePrice!}
                    experienceCapacity={state.experience!.capacity}
                    selectedSlot={state.form.timeslot!}
                    isOnlineExperience={state.experience?.isOnlineExperience!}
                    onBookingTypeChange={bookingType => {
                        dispatch({ type: 'SET_BOOKING_TYPE', bookingType });
                    }}
                    onNumGuestsChange={numGuests => {
                        dispatch({ type: 'SET_NUM_GUESTS', numGuests });
                    }}
                    onSlideComplete={handleContinue} />
                );
            case 'payment':
                return (
                    <PaymentSlide
                    email={state.form.email}
                    zipCode={state.form.zipCode}
                    selectedDate={state.form.date!}
                    selectedSlot={state.form.timeslot!}
                    currency={state.experience?.currency!}
                    fees={state.form.fees!}
                    onEmailChange={email => {
                        dispatch({ type: 'SET_EMAIL', email });
                    }}
                    onZipCodeChange={zipCode => {
                        dispatch({ type: 'SET_ZIP_CODE', zipCode });
                    }}
                    onSlideComplete={handleContinue} />
                );
            default: throw Error('Invalid booking step');
        }
    }

    // Once the booking is created, show the summary slide
    if (state.bookingData) {
        const { 
            meetingPoint, 
            creatorPhone, 
            cardBrand, 
            cardLast4 
        } = state.bookingData.createBooking;

        return (
            <SubmittedSlide
            startDate={state.form.timeslot!.dateStart}
            endDate={state.form.timeslot!.dateEnd}
            numGuests={state.form.numGuests}
            cardBrand={cardBrand}
            cardLast4={cardLast4}
            totalPrice={state.form.fees.totalPrice}
            currency={state.experience!.currency!}
            experience={{
                title: state.experience!.title,
                image: state.experience!.images[0],
                meetingPoint: meetingPoint || undefined,
                toBring: state.experience!.toBringItems
            }}
            host={{
                name: state.experience!.creator.user.firstName,
                photo: state.experience!.creator.user.photo!,
                phoneNumber: creatorPhone
            }} />
        );
    }

    if (!state.experience) {
        return <Spinner />;
    }

    const isFirstStep = state.step === 'date';
    const isLastStep = state.step === 'payment';

    return (
        <Layout
        experience={state.experience}
        currentStep={state.step}
        nextButtonWidth={isFirstStep ? 330 : isLastStep ? 370 : '100%'}
        canContinue={state.canContinue}
        bookingPrice={isLastStep ? state.form.fees.totalPrice : undefined}
        onGoBack={() => {
            isFirstStep ? router.back() : dispatch({ type: 'GO_BACK' });
        }}
        onGoNext={() => {
            isLastStep ? handleSubmit() : dispatch({ type: 'GO_TO_NEXT_STEP' });
        }}>
            {state.loading && <Spinner />}
            {getSlideContent()}
        </Layout>
    );
}

BookExperiencePage.displayName = 'BookExperiencePage';

export default BookExperiencePage;