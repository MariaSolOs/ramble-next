import { Occurrence } from 'models/mongodb';
import type { BookingType } from 'models/experience-interface';

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
 * Creates a new experience occurrence.
 * 
 * @param experienceId - The experience's ID
 * @param dateStart - The start date of the occurrence
 * @param dateEnd - The end date of the occurrence
 */
export const createOccurrence = async (
    experienceId: string,
    experienceCapacity: number,
    dateStart: string, 
    dateEnd: string
) => {
    const occurrence = await Occurrence.create({
        experience: experienceId,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        spotsLeft: experienceCapacity,
        creatorProfit: 0
    });

    return occurrence;
}