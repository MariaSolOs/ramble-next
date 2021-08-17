import Stripe from 'stripe';
import type { Document } from 'mongoose';

import { sendBookingConfirmation } from 'lib/sendgrid';
import Booking from 'models/mongodb/booking';
import type { Occurrence as OccurrenceType } from 'models/mongodb/occurrence';
import type { Experience as ExperienceType } from 'models/mongodb/experience';
import type { Creator as CreatorType } from 'models/mongodb/creator';
import type { User as UserType } from 'models/mongodb/user';
import type { Currency } from 'models/experience-interface';

const serverStripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27'
});

const EMAIL_DATE_FORMAT: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Toronto'
}

const EMAIL_TIME_FORMAT: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Toronto'
}

/**
 * @returns The server-side Stripe instance.
 */
export const getStripe = () => {
    return serverStripe;
}

/**
 * @param accountId - The creator's Stripe account ID
 * @param creatorId - The creator's ID
 * @returns The URL to initiate the Stripe onboarding
 */
export const getAccountLink = async (accountId: string) => {
    const accountLink = await serverStripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.RAMBLE_URL}/api/stripe/onboarding-refresh`,
        return_url: `${process.env.RAMBLE_URL}/api/stripe/onboarding-return`,
        type: 'account_onboarding'
    });

    return accountLink.url;
}

/**
 * Updates the database and sends the confirmation email when a 
 * booking request is successfully accepted.
 * 
 * @param paymentIntent - The payment intent object to handle
 */
export const handleSuccessfulPaymentIntent = async (paymentIntent: Stripe.PaymentIntent) => {
    // Find the booking with all the info we need
    const booking = await Booking.findOne({ 
        'stripe.paymentIntentId': paymentIntent.id 
    }).populate([
        {
            path: 'occurrence',
            select: 'experience creatorProfit dateStart dateEnd',
            populate: {
                path: 'experience',
                select: 'creator title toBring location zoomInfo',
                populate: {
                    path: 'creator',
                    select: 'user',
                    populate: {
                        path: 'user',
                        select: 'fstName photo phoneNumber'
                    }
                }
            }
        },
        {
            path: 'client',
            select: 'emailAddress'
        }
    ]);

    if (!booking) {
        console.log('[Stripe webhook handler]: Unregistered payment intent ID.');
        return;
    }

    // Make sure we don't repeat this process
    if (booking.stripe.paymentCaptured) {
        console.log('[Stripe webhook handler]: Action already managed.');
        return;
    }

    const occurrence = booking.occurrence as OccurrenceType & Document;
    const experience = occurrence.experience as ExperienceType;
    const creator = experience.creator as CreatorType;
    const client = booking.client as UserType;

    // Update occurrence
    occurrence.creatorProfit += booking.stripe.creatorProfit;
    booking.stripe.paymentCaptured = true;

    // Send the confirmation email
    const timeStart = occurrence.dateStart.toLocaleTimeString('en-CA', EMAIL_TIME_FORMAT);
    const timeEnd = occurrence.dateEnd.toLocaleTimeString('en-CA', EMAIL_TIME_FORMAT);
    const isOnlineExperience = Boolean(experience.zoomInfo?.PMI);
    sendBookingConfirmation({
        price: (paymentIntent.amount / 100).toFixed(2),
        currency: paymentIntent.currency.toUpperCase() as Currency,
        bookingDate: booking.createdAt.toLocaleDateString('en-CA', EMAIL_DATE_FORMAT),
        occurrenceDate: occurrence.dateStart.toLocaleDateString('en-CA', EMAIL_DATE_FORMAT),
        timeslot: `${timeStart} - ${timeEnd}`,
        numGuests: booking.numGuests,
        experienceTitle: experience.title,
        toBringItems: (experience.toBring && experience.toBring.length > 0) ? 
        experience.toBring : undefined,
        hostName: (creator.user as UserType).fstName,
        hostPicture: (creator.user as UserType).photo!,
        hostPhone: (creator.user as UserType).phoneNumber!,
        meetingPoint: isOnlineExperience ? undefined : experience.location.meetPoint!,
        zoomPMI: isOnlineExperience ? experience.zoomInfo!.PMI : undefined,
        zoomPassword: isOnlineExperience ? experience.zoomInfo!.password : undefined
    }, client.emailAddress);

    // Save all changes
    await booking.save();
    await occurrence.save();
}

export const handleCanceledPaymentIntent = async (paymentIntent: Stripe.PaymentIntent) => {
    // Find the booking with all the info we need
    const booking = await Booking.findOne({ 
        'stripe.paymentIntentId': paymentIntent.id 
    }).populate({
        path: 'occurrence',
        select: 'experience spotsLeft bookings',
        populate: {
            path: 'experience',
            select: 'capacity'
        }
    });

    // Because we delete the booking, this also ensures we don't do this twice
    if (!booking) {
        console.log('[Stripe webhook handler]: Unregistered payment intent ID.');
        return;
    }

    const occurrence = booking.occurrence as OccurrenceType & Document;
    const experience = occurrence.experience as ExperienceType;

    // Update the spots left (restore capacity of private bookings) and
    // remove booking from occurrence
    occurrence.spotsLeft += booking.bookingType === 'private' ?
        experience.capacity : booking.numGuests;
    occurrence.bookings = occurrence.bookings.filter(id => 
        id !== booking._id
    );

    // Delete the booking
    await Booking.findByIdAndDelete(booking._id);

    // Save all changes
    await occurrence.save();
}