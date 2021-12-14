import { AuthenticationError, ApolloError } from 'apollo-server-micro';
import { Types } from 'mongoose';
import type Stripe from 'stripe';
import type { FilterQuery, Document } from 'mongoose';

import Experience from 'models/mongodb/experience';
import Occurrence from 'models/mongodb/occurrence';
import Booking from 'models/mongodb/booking';
import User from 'models/mongodb/user';
import Creator from 'models/mongodb/creator';
import Review from 'models/mongodb/review';
import {
    experienceReducer,
    occurrenceReducer,
    bookingReducer,
    userReducer,
    creatorReducer,
    reviewReducer
} from 'lib/graphql';
import { getPlaceholder, deletePhotos } from 'lib/cloudinary';
import { computeBookingFees } from 'lib/booking';
import { sendBookingNotificationEmail } from 'lib/sendgrid';
import { getStripe } from 'lib/server-stripe';
import { BookingType } from 'graphql-server/sdk';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';
import type { Experience as ExperienceType } from 'models/mongodb/experience';
import type { User as UserType } from 'models/mongodb/user';
import type { Creator as CreatorType } from 'models/mongodb/creator';
import type { Resolvers } from './resolvers-types';

const stripe = getStripe();

/**
 * Creates a new experience occurrence.
 * 
 * @param experienceId - The experience's ID
 * @param dateStart - The start date of the occurrence
 * @param dateEnd - The end date of the occurrence
 */
const createOccurrence = async (
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

// TODO: Add logging logic here and in Vercel

export const resolvers: Resolvers = {
    Experience: {
        creator: ({ creator }) => Creator.findById(creator).lean(MONGOOSE_LEAN_DEFAULTS).then(creatorReducer),
        images: ({ images }) => {
            return images.map(async (src) => {
                const placeholder = await getPlaceholder(src);
                return { src, placeholder }
            });
        }
    },

    Occurrence: {
        experience: ({ experience }) => Experience.findById(experience).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer),
        bookings: async occ => {
            const bookings = await Booking.find({ 
                _id: { $in: (occ.bookings as Types.ObjectId[]) }
            }).lean(MONGOOSE_LEAN_DEFAULTS);
            return bookings.map(bookingReducer);
        }
    },

    Booking: {
        client: ({ client }) => User.findById(client).lean(MONGOOSE_LEAN_DEFAULTS).then(userReducer),
        occurrence: ({ occurrence }) => Occurrence.findById(occurrence).lean(MONGOOSE_LEAN_DEFAULTS).then(occurrenceReducer)
    },

    User: {
        photo: async ({ photo }) => {
            const src = photo || '';
            const placeholder = src ? await getPlaceholder(src) : '';
            return {
                src,
                placeholder
            }
        },
        creator: ({ creator }) => Creator.findById(creator).lean(MONGOOSE_LEAN_DEFAULTS).then(creatorReducer),
        savedExperiences: async user => {
            const exps = await Experience.find({ 
                _id: { $in: user.savedExperiences as Types.ObjectId[] } 
            }).lean(MONGOOSE_LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        },
        bookedExperiences: async user => {
            const exps = await Experience.find({ 
                _id: { $in: user.bookedExperiences as Types.ObjectId[] } 
            }).lean(MONGOOSE_LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        }
    },

    Creator: {
        user: ({ user }) => User.findById(user).lean(MONGOOSE_LEAN_DEFAULTS).then(userReducer),
        bookingRequests: async creator => {
            const bookings = await Booking.find({ 
                _id: { $in: creator.bookingRequests as Types.ObjectId[] }
            }).sort('-createdAt').lean(MONGOOSE_LEAN_DEFAULTS);
            // Sort bookings by their creation date (most recent first)
            return bookings.map(bookingReducer);
        }
    },

    Query: {
        me: async (_, { userId }) => {
            if (!userId) {
                throw new AuthenticationError('Invalid user ID');
            }
    
            const user = await User.findById(userId).lean(MONGOOSE_LEAN_DEFAULTS);
            return userReducer(user);
        },
    
        experiences: async (_, { location, capacity, creatorId }) => {
            // Only approved experiences are made public
            const filter: FilterQuery<typeof Experience> = {}

            // Creators can see experiences that haven't been approved
            if (creatorId) { 
                filter.creator = creatorId;
            } else {
                filter.status = 'approved';
            }
    
            if (location) {
                if (location === 'Online') {
                    filter.zoomInfo = { $exists: true }
                } else {
                    filter['location.displayLocation'] = location;
                }
            }
    
            // The capacity is just a lower bound
            if (capacity) {
                filter.capacity = { $gte: capacity }
            }
    
            const exps = await Experience.find(filter).lean(MONGOOSE_LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        },

        experiencesById: async (_, { ids }) => {
            const experiences = await Experience.find({
                _id: { $in: ids }
            }).lean(MONGOOSE_LEAN_DEFAULTS);
            
            return experiences.map(experienceReducer);
        },
    
        occurrences: async (_, { experienceIds }) => {
            const occs = await Occurrence.find({
                experience: { $in: experienceIds },
                dateStart: {
                    $gte: new Date(new Date().setUTCHours(0, 0, 0))
                }
            }).lean(MONGOOSE_LEAN_DEFAULTS);

            return occs.map(occurrenceReducer);
        },

        getReviews: async (_, { experienceId }) => {
            const reviews = await Review.find({ 
                experience: experienceId,
                approved: true
            }).sort('-createdAt').lean(MONGOOSE_LEAN_DEFAULTS);
            // Newest reviews are at the top

            return reviews.map(reviewReducer);
        }
    },

    Mutation: {
        signUpUser: async (_, { email, password, firstName, lastName, phoneNumber }) => {
            const emailExists = await User.exists({ emailAddress: email });
            if (emailExists) {
                throw new AuthenticationError('Email already in use.');
            }

            const createdUser = await User.create({
                fstName: firstName,
                lstName: lastName,
                emailAddress: email,
                passwordHash: User.generatePasswordHash(password),
                lastLogin: new Date(),
                phoneNumber
            });

            return userReducer(createdUser);
        },

        logInUser: async (_, { email, password }) => {
            const user = await User.findOneAndUpdate({
                emailAddress: email
            }, { lastLogin: new Date() });

            if (!user) {
                throw new AuthenticationError("There's no account associated to that email.");
            }

            if (!User.isValidPassword(password, user.passwordHash)) {
                throw new AuthenticationError('Invalid password.');
            }

            return userReducer(user);
        },

        resetPassword: async (_, { userId, password }) => {
            const user = await User.findByIdAndUpdate(userId, {
                passwordHash: User.generatePasswordHash(password)
            }).lean(MONGOOSE_LEAN_DEFAULTS);
            
            return userReducer(user);
        },

        editUser: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            const user = await User.findById(userId);
            if (!user) {
                throw new ApolloError('User not found.');
            }

            // Delete old pictures from Cloudinary
            if (args.photo && user.photo) {
                deletePhotos([user.photo], 'Users');
            }

            // The creator bio is updated in the creator object
            if (args.creatorBio) {
                await Creator.findByIdAndUpdate(user.creator, {
                    bio: args.creatorBio
                });
            }

            // Set the fields to update
            const newFields: Partial<UserType> = {
                ...args.firstName && { fstName: args.firstName },
                ...args.lastName && { lstName: args.lastName },
                ...(typeof args.birthday === 'string') && { birthday: new Date(args.birthday) },
                ...args.email && { emailAddress: args.email },
                ...args.photo && { photo: args.photo },
                ...(typeof args.phoneNumber === 'string') && { phoneNumber: args.phoneNumber },
                ...(typeof args.city === 'string') && { city: args.city }
            }

            // Save changes
            for (const [field, value] of Object.entries(newFields)) {
                (user as any)[field] = value;
            }
            await user.save();

            return userReducer(user);
        },

        signUpCreator: async (_, { bio, governmentIds }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            const creator = await Creator.create({
                user: Types.ObjectId(userId),
                bio,
                governmentIds,
                stripe: { onboarded: false }
            });

            // Connect user account
            await User.findByIdAndUpdate(userId, {
                creator: Types.ObjectId(creator._id)
            });

            return creatorReducer(creator);
        },

        saveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            await User.findByIdAndUpdate(userId, { 
                $addToSet: { savedExperiences: Types.ObjectId(experienceId) } 
            });

            return Experience.findById(experienceId).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer);
        },

        unsaveExperience: async (_, { experienceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            await User.findByIdAndUpdate(userId, { 
                $pull: { savedExperiences: Types.ObjectId(experienceId) } 
            });
            return Experience.findById(experienceId).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer);
        },

        createExperience: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("Creator isn't logged in.");
            }

            // If we have Zoom info, create online experience
            const isOnlineExperience = Boolean(args.zoomPMI);

            // Get the creator ID
            const creator = await User.findById(userId, 'creator').lean(MONGOOSE_LEAN_DEFAULTS);
            const creatorId = creator?.creator!;

            // Create the experience
            const experience = await Experience.create({
                status: 'pending',
                title: args.title,
                description: args.description,
                images: args.images,
                categories: args.categories,
                duration: args.duration,
                languages: args.languages,
                capacity: args.capacity,
                included: args.includedItems,
                toBring: args.toBringItems,
                creator: creatorId,
                price: {
                    perPerson: args.pricePerPerson,
                    currency: args.currency,
                    ...args.privatePrice && {
                        private: args.privatePrice
                    }
                },
                ...isOnlineExperience && {
                    zoomInfo: {
                        PMI: args.zoomPMI,
                        password: args.zoomPassword
                    }
                },
                location: {
                    displayLocation: args.location,
                    ...!isOnlineExperience && {
                        meetPoint: args.meetingPoint,
                        coordinates: {
                            lat: args.latitude,
                            long: args.longitude
                        }
                    }
                },
                ...args.ageRestriction && {
                    ageRestriction: args.ageRestriction
                }
            });

            // Create the occurrences
            for (const slot of args.slots) {
                await createOccurrence(
                    experience._id,
                    experience.capacity,
                    slot.start,
                    slot.end
                );
            }

            return experienceReducer(experience);
        },

        editExperience: async (_, args, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("Creator isn't logged in.");
            }

            // Find the experience
            const experience = await Experience.findById(args._id);
            if (!experience) {
                throw new ApolloError('Experience not found');
            }

            // Delete Cloudinary images if applicable
            if (args.images) {
                const oldImages = experience.images.filter(oldImg =>
                    !args.images!.some(img => img === oldImg)
                );
                deletePhotos(oldImages, 'Experiences');
            }

            // Set the fields to update
            const isInPersonExperience = !Boolean(experience.zoomInfo?.PMI);
            const priceChanged = (
                Boolean(args.pricePerPerson) || 
                Boolean(args.privatePrice) || 
                Boolean(args.currency)
            );
            const newFields: Partial<ExperienceType> = {
                ...args.description && { description: args.description },
                ...args.images && { images: args.images },
                ...(args.meetingPoint && isInPersonExperience) && {
                    location: {
                        // The location never changes, only the meeting point
                        displayLocation: experience.location.displayLocation,
                        meetPoint: args.meetingPoint,
                        coordinates: {
                            lat: args.latitude || experience.location.coordinates!.lat,
                            long: args.longitude || experience.location.coordinates!.long
                        }
                    }
                },
                ...args.ageRestriction && { ageRestriction: args.ageRestriction },
                ...args.duration && { duration: args.duration },
                ...args.languages && { languages: args.languages },
                ...args.includedItems && { included: args.includedItems },
                ...args.toBringItems && { toBring: args.toBringItems },
                ...priceChanged && {
                    price: {
                        perPerson: args.pricePerPerson || experience.price.perPerson,
                        private: args.privatePrice || experience.price.private,
                        currency: args.currency || experience.price.currency
                    }
                }
            }

            // Save changes
            for (const [field, value] of Object.entries(newFields)) {
                (experience as any)[field] = value;
            }
            await experience.save();

            return experienceReducer(experience);
        },

        createBooking: async (_, { occurrenceId, bookingType, numGuests, paymentIntentId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            // Find the experience and the occurrence to book
            const occurrence = await Occurrence.findById(
                occurrenceId
            ).populate({
                path: 'experience',
                select: '_id creator price title location',
                populate: {
                    path: 'creator',
                    select: 'user bookingRequests',
                    populate: {
                        path: 'user',
                        select: '_id emailAddress phoneNumber'
                    }
                }
            });
            if (!occurrence) {
                throw new ApolloError('Occurrence not found.');
            }

            const experience = occurrence.experience as ExperienceType;
            const creator = experience.creator as CreatorType & Document;
            const creatorUser = creator.user as UserType;

            // Create booking
            const { creatorProfit } = computeBookingFees(
                Boolean(experience.location.meetPoint),
                bookingType,
                numGuests, 
                experience.price.perPerson,
                experience.price.private
            );

            const booking = await Booking.create({
                occurrence: occurrence._id,
                bookingType,
                numGuests,
                client: userId,
                stripe: {
                    paymentIntentId,
                    paymentCaptured: false,
                    creatorProfit
                }
            });

            // Add booking to occurrence and update capacity
            occurrence.spotsLeft = bookingType ===  BookingType.Private? 
                0 : occurrence.spotsLeft - numGuests;
            occurrence.bookings.push(booking._id);

            // Add booking to creator's requests
            creator.bookingRequests?.push(booking._id);

            // Get card info to display in the booking submitted page
            const { payment_method } = await stripe.paymentIntents.retrieve(paymentIntentId, {
                expand: ['payment_method']
            });

            // Add experience to user's booked experiences
            const client = await User.findByIdAndUpdate(userId, {
                $addToSet: { bookedExperiences: experience._id }
            }, { lean: true });

            // Save all changes
            await occurrence.save();
            await creator.save();

            // Send email notification to creator
            sendBookingNotificationEmail(
                client?.fstName || '',
                experience.title,
                creatorUser.emailAddress
            );

            return {
                creatorPhone: creatorUser.phoneNumber!,
                meetingPoint: experience.location.meetPoint,
                cardBrand: (payment_method as Stripe.PaymentMethod).card?.brand || '',
                cardLast4: (payment_method as Stripe.PaymentMethod).card?.last4 || ''
            }
        },

        createOccurrence: async (_, { experienceId, experienceCapacity, dates }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("Creator isn't logged in.");
            }

            const occurrence = await createOccurrence(
                experienceId,
                experienceCapacity,
                dates.start,
                dates.end
            );
            return occurrenceReducer(occurrence);
        },

        deleteOccurrence: async (_, { occurrenceId }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("Creator isn't logged in.");
            }
            
            const occurrence = await Occurrence.findOneAndDelete({
                _id: occurrenceId,
                bookings: { $size: 0 }
            });
            return occurrenceReducer(occurrence);
        },

        createReview: async (_, { experienceId, value, text  }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError("User isn't logged in.");
            }

            // Find the user writing the review
            const reviewer = await User.findById(userId, 'fstName lstName').lean();
            if (!reviewer) {
                throw new ApolloError('Reviewer not found.');
            }

            // Create the review
            const reviewerName = `${reviewer.fstName} ${reviewer.lstName.charAt(0)}.`;
            const newReview = await Review.create({
                experience: experienceId,
                reviewer: userId,
                reviewerName,
                value,
                text,
                approved: false
            });

            return reviewReducer(newReview);
        }
    }
}