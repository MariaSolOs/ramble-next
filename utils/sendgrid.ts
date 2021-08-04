import mjml2html from 'mjml';
import { compile } from 'handlebars';
import fs from 'fs';
import path from 'path';
import sgMail from '@sendgrid/mail';

// import type { Currency } from 'models/experience-interface';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// type ConfirmationEmailInfo = {
//     price: string;
//     currency: Currency;
//     bookingDate: string;
//     occurrenceDate: string;
//     experienceTitle: string;
//     timeslot: string;
//     numGuests: number;
//     hostPicture: string;
//     hostName: string;
//     hostPhone: string;
//     toBringItems?: string[];
//     meetingPoint?: string;
//     zoomPMI?: string;
//     zoomPassword?: string;
// }

/**
 * Sends an email for resetting the user's password.
 * 
 * @param userId - The ID of the unlucky user
 * @param emailAddress - The address to send the email to
 */
export const sendPasswordResetEmail = async (
    userId: string, 
    emailAddress: string
) => {
    const source = fs.readFileSync(path.resolve(process.cwd(), 'email-templates', 'password-reset.mjml'), 'utf-8');              
    const template = compile(source);
    const mjml = template({
        passwordLink: `${process.env.VERCEL_URL}?password-reset=${userId}`
    });

    await sgMail.send({
        from: {
            email: process.env.ZOHO_EMAIL!, 
            name: 'ramble'
        },
        to: emailAddress,
        subject: 'Reset your password', 
        text: "Forgot your password? It's okay, you can create a new one.", 
        html: mjml2html(mjml).html
    });
}

// /**
//  * Sends an email to a creator when a booking is made.
//  * 
//  * @param clientName - The client's name
//  * @param experienceName - The name of the experience that was booked
//  * @param dashboardLink - The link that the creator will be redirected to
//  * @param creatorEmail - The address to send the email to
//  */
// export const sendBookingNotificationEmail = async (
//     clientName: string, 
//     experienceName: string,
//     dashboardLink: string,
//     creatorEmail: string
// ) => {
//     const source = fs.readFileSync(path.resolve(__dirname, '../email-templates/new-booking.mjml'), 'utf-8');
//     const template = compile(source);
//     const mjml = template({
//         clientName,
//         experienceName,
//         dashboardLink
//     });
    
//     await sgMail.send({
//         from: {
//             email: process.env.ZOHO_EMAIL!,
//             name: 'ramble' 
//         },
//         to: creatorEmail,
//         subject: 'You have a new booking request',
//         text: `You have a new booking! ${clientName} just booked your experience ${
//         experienceName}. Log in to your creator dashboard to check their booking request.`,
//         html: mjml2html(mjml).html
//     });
// }

// /**
//  * Sends the booking confirmation email (once the creator accepted the request).
//  * 
//  * @param emailInfo - The booking/occurrence/experience information
//  * @param clientEmail - The address to send the email to
//  */
// export const sendBookingConfirmation = async (
//     emailInfo: ConfirmationEmailInfo,
//     clientEmail: string
// ) => {
//     const source = fs.readFileSync(path.resolve(__dirname, '../email-templates/booking-confirmation.mjml'), 'utf-8');
//     const template = compile(source);
//     const mjml = template({ ...emailInfo });

//     // Based on the setting, specify the meeting details
//     const isOnlineExperience = Boolean(emailInfo.zoomPMI);
//     const meetingDetails = isOnlineExperience ? 
//         `The Zoom PMI is ${emailInfo.zoomPMI!} and the password is ${emailInfo.zoomPassword!}` :
//         `The meeting point is ${emailInfo.meetingPoint!}`;
    
//     await sgMail.send({
//         from: {
//             name: 'ramble',
//             email: process.env.ZOHO_EMAIL!
//         },
//         to: clientEmail,
//         subject: 'Your booking is confirmed', 
//         text: `Your booking is confirmed! You're all set for your experience "${
//         emailInfo.experienceTitle}" on ${emailInfo.occurrenceDate} (${
//         emailInfo.timeslot}). ${meetingDetails}${emailInfo.toBringItems ? 
//         ' and you will need to bring ' + emailInfo.toBringItems.join(', ') : 
//         '.'} Your host is ${emailInfo.hostName} (phone number: ${
//         emailInfo.hostPhone}. Thank you for experiencing with Ramble!`,
//         html: mjml2html(mjml).html
//     });
// }