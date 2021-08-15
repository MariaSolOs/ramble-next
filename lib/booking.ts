import type { BookingType } from 'models/experience-interface';

import { faCcVisa } from '@fortawesome/free-brands-svg-icons/faCcVisa';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons/faCcMastercard';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons/faCcAmex';
import { faCcDinersClub } from '@fortawesome/free-brands-svg-icons/faCcDinersClub';
import { faCcDiscover } from '@fortawesome/free-brands-svg-icons/faCcDiscover';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';

/**
 * Computes all the fees associated to a booking.
 * 
 * @param isInPersonExperience - Whether the experience is on Zoom or not
 * @param bookingType - The booking type ('public' or 'private')
 * @param numGuests - The number of guests in the booking
 * @param perPersonPrice - Experience's price per person
 * @param privatePrice - The experience's private price
 * @returns The fees breakdown
 */
export const computeBookingFees = (
    isInPersonExperience: boolean,
    bookingType: BookingType,
    numGuests: number,
    perPersonPrice: number,
    privatePrice?: number
) => {
    let bookingPrice = 0;
    if (bookingType === 'public') {
        bookingPrice = perPersonPrice;
        // For in person experiences, the costs are per guest
        if (isInPersonExperience) {
            bookingPrice *= numGuests;
        }
    } else { // bookingType === 'private'
        bookingPrice = privatePrice!;
    }

    // Compute the taxes
    const serviceFee = (bookingPrice * 0.0345) + 0.33;
    const withServiceFee = serviceFee + bookingPrice;
    const taxGST = 0.05 * withServiceFee;
    const taxQST = 0.09975 * withServiceFee;

    const rambleGain = bookingPrice * 0.2;
    // We keep the taxes
    const application_fee_amount = rambleGain + taxGST + taxQST + serviceFee;
    const amount = withServiceFee + taxGST + taxQST;
    const creatorProfit = amount - application_fee_amount;

    // Multiply by 100 and round because Stripe wants cents
    return {
        withServiceFee: Math.round(100 * withServiceFee),
        serviceFee: Math.round(100 * serviceFee),
        taxGST: Math.round(100 * taxGST),
        taxQST: Math.round(100 * taxQST),
        rambleGain: Math.round(100 * rambleGain),
        creatorProfit: Math.round(100 * creatorProfit),
        application_fee_amount: Math.round(100 * application_fee_amount),
        amount: Math.round(100 * amount)
    }
}

/**
 * Computes the breakdown for the receipt.
 * 
 * @param price - The experience price (either the private or public/per person one)
 * @param isOnlineExperience - If true, the experience is on Zoom
 * @param numGuests - Number of guests. Only defined for public experiences
 * @returns The breakdown information
 */
export const getFeesBreakdown = (price: number, isOnlineExperience: boolean, bookingType: BookingType, numGuests: number) => {
    let bookingPrice = 0;
    let subTotalString = '';

    if (bookingType === 'public' && !isOnlineExperience) {
        bookingPrice = price * numGuests;
        subTotalString = `${numGuests} x ${price.toFixed(2)} = ${bookingPrice.toFixed(2)}`;       
    } else {
        bookingPrice = price;
        subTotalString = price.toFixed(2);
    }

    const serviceFee = (bookingPrice * 0.0345) + 0.33;
    const withServiceFee = serviceFee + bookingPrice;
    const taxGST = 0.05 * withServiceFee;
    const taxQST = 0.09975 * withServiceFee;
    const totalPrice = withServiceFee + taxGST + taxQST;

    return {
        subTotalString,
        withServiceFee,
        serviceFee,
        taxGST,
        taxQST,
        totalPrice
    }
}

/**
 * Helper function for getting nice credit card icons.
 * 
 * @param brand - The card's brand (as given by Stripe)
 * @returns The brand's icon
 */
export const getCardIcon = (brand: string) => {
    switch (brand) {
        case 'amex': return faCcAmex;
        case 'diners_club': return faCcDinersClub;
        case 'discover': return faCcDiscover;
        case 'mastercard': return faCcMastercard;
        case 'visa': return faCcVisa;
        default: return faCreditCard;
    }
}