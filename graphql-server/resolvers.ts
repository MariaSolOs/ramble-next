import { AuthenticationError, ApolloError } from 'apollo-server-micro';

import { 
    Experience,
    Occurrence,
    Booking,
    User,
    Creator 
} from 'models/mongodb';
import {
    experienceReducer,
    occurrenceReducer,
    bookingReducer,
    userReducer,
    creatorReducer
} from 'utils/graphql-data-mappers';
import { getPlaceholder, deleteUserPicture } from 'utils/cloudinary';
import { MONGOOSE_LEAN_DEFAULTS } from 'global-constants';
import type { User as UserType } from 'models/mongodb/user';
import type { Resolvers } from './resolvers-types';

export const resolvers: Resolvers = {
    Experience: {
        creator: ({ creator }) => Creator.findById(creator).lean(MONGOOSE_LEAN_DEFAULTS).then(creatorReducer)
    },

    Occurrence: {
        experience: ({ experience }) => Experience.findById(experience).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer),
        bookings: async occ => {
            const bookings = await Booking.find({ _id: { $in: occ.bookings }}).lean(MONGOOSE_LEAN_DEFAULTS);
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
            const exps = await Experience.find({ _id: { $in: user.savedExperiences } }).lean(MONGOOSE_LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        },
        bookedExperiences: async user => {
            const exps = await Experience.find({ _id: { $in: user.bookedExperiences } }).lean(MONGOOSE_LEAN_DEFAULTS);
            return exps.map(experienceReducer);
        }
    },

    Creator: {
        user: ({ user }) => User.findById(user).lean(MONGOOSE_LEAN_DEFAULTS).then(userReducer),
        bookingRequests: async creator => {
            const bookings = await Booking.find({ 
                _id: { $in: creator.bookingRequests }
            }).sort('-createdAt').lean(MONGOOSE_LEAN_DEFAULTS);
            // Sort bookings by their creation date (most recent first)
            return bookings.map(bookingReducer);
        }
    },

    // Query: {
    //     me: async (_, __, { userId }) => {
    //         if (!userId) {
    //             throw new AuthenticationError('Invalid user ID');
    //         }
    
    //         const user = await User.findById(userId).lean(MONGOOSE_LEAN_DEFAULTS);
    //         const userInfo = userReducer(user);
    //         userInfo.token = generateToken(userId);
            
    //         return userInfo;
    //     },
    
    //     experiences: async (_, { location, capacity, creatorId }) => {
    //         // Only approved experiences are made public
    //         const filter: FilterQuery<typeof Experience> = { status: 'approved' }

    //         if (creatorId) {
    //             filter.creator = creatorId;
    //         }
    
    //         if (location) {
    //             if (location === 'Online') {
    //                 filter.zoomInfo = { $exists: true }
    //             } else {
    //                 filter['location.displayLocation'] = location;
    //             }
    //         }
    
    //         // The capacity is just a lower bound
    //         if (capacity) {
    //             filter.capacity = { $gte: capacity }
    //         }
    
    //         const exps = await Experience.find(filter).lean(MONGOOSE_LEAN_DEFAULTS);
    //         return exps.map(experienceReducer);
    //     },
    
    //     experience: (_, { id }) => Experience.findById(id).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer),
    
    //     occurrences: async (_, { experienceIds }) => {
    //         const occs = await Occurrence.find({
    //             experience: { $in: experienceIds },
    //             dateStart: {
    //                 $gte: new Date(new Date().setUTCHours(0, 0, 0))
    //             }
    //         }).lean(MONGOOSE_LEAN_DEFAULTS);

    //         return occs.map(occurrenceReducer);
    //     }
    // },

    Mutation: {
        signUpUser: async (_, { email, password, firstName, lastName }) => {
            const emailExists = await User.exists({ emailAddress: email });
            if (emailExists) {
                throw new AuthenticationError('Email already in use.');
            }

            const createdUser = await User.create({
                fstName: firstName,
                lstName: lastName,
                emailAddress: email,
                passwordHash: User.generatePasswordHash(password),
                lastLogin: new Date()
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
                deleteUserPicture(user.photo);
            }

            // The creator bio is updated in the creator object
            if (args.creatorBio) {
                await Creator.findByIdAndUpdate(user.creator, {
                    bio: args.creatorBio
                });
            }

            // Set the fields to update
            const newFields: Partial<Record<keyof UserType, string | Date>> = {
                ...args.firstName && { fstName: args.firstName },
                ...args.lastName && { lstName: args.lastName },
                ...(typeof args.birthday === 'string') && { birthday: new Date(args.birthday) },
                ...args.email && { emailAddress: args.email },
                ...args.photo && { photo: args.photo },
                ...(typeof args.phoneNumber === 'string') && { phoneNumber: args.phoneNumber },
                ...(typeof args.city === 'string') && { city: args.city }
            }

            for (const [field, value] of Object.entries(newFields)) {
                (user as any)[field] = value;
            }
            
            await user.save();

            return userReducer(user);
        },

    //     signUpCreator: async (_, { bio, governmentIds }, { userId }) => {
    //         if (!userId) {
    //             throw new AuthenticationError("User isn't logged in.");
    //         }

    //         const creator = await Creator.create({
    //             user: Types.ObjectId(userId),
    //             bio,
    //             verified: false,
    //             governmentIds,
    //             stripe: { onboarded: false }
    //         });

    //         // Connect user account
    //         await User.findByIdAndUpdate(userId, {
    //             creator: Types.ObjectId(creator._id)
    //         });

    //         return creatorReducer(creator);
    //     },

    //     saveExperience: async (_, { experienceId }, { userId }) => {
    //         if (!userId) {
    //             throw new AuthenticationError("User isn't logged in.");
    //         }

    //         await User.findByIdAndUpdate(userId, { 
    //             $addToSet: { savedExperiences: Types.ObjectId(experienceId) } 
    //         });

    //         return Experience.findById(experienceId).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer);
    //     },

    //     unsaveExperience: async (_, { experienceId }, { userId }) => {
    //         if (!userId) {
    //             throw new AuthenticationError("User isn't logged in.");
    //         }

    //         await User.findByIdAndUpdate(userId, { 
    //             $pull: { savedExperiences: Types.ObjectId(experienceId) } 
    //         });
    //         return Experience.findById(experienceId).lean(MONGOOSE_LEAN_DEFAULTS).then(experienceReducer);
    //     },

    //     createExperience: async (_, args, { userId }) => {
    //         if (!userId) {
    //             throw new AuthenticationError("Creator isn't logged in.");
    //         }

    //         // If we have Zoom info, create online experience
    //         const isOnlineExperience = Boolean(args.zoomPMI);

    //         // Get the creator ID
    //         const creator = await User.findById(userId, 'creator').lean(MONGOOSE_LEAN_DEFAULTS);
    //         const creatorId = creator?.creator!;

    //         // Create the experience
    //         const experience = await Experience.create({
    //             status: 'pending',
    //             title: args.title,
    //             description: args.description,
    //             images: args.images,
    //             categories: args.categories,
    //             duration: args.duration,
    //             languages: args.languages,
    //             capacity: args.capacity,
    //             included: args.includedItems,
    //             toBring: args.toBringItems,
    //             creator: creatorId,
    //             price: {
    //                 perPerson: args.pricePerPerson,
    //                 currency: args.currency,
    //                 ...args.privatePrice && {
    //                     private: args.privatePrice
    //                 }
    //             },
    //             ...isOnlineExperience && {
    //                 zoomInfo: {
    //                     PMI: args.zoomPMI,
    //                     password: args.zoomPassword
    //                 }
    //             },
    //             location: {
    //                 displayLocation: args.location,
    //                 ...!isOnlineExperience && {
    //                     meetPoint: args.meetingPoint,
    //                     coordinates: {
    //                         lat: args.latitude,
    //                         long: args.longitude
    //                     }
    //                 }
    //             },
    //             ...args.ageRestriction && {
    //                 ageRestriction: args.ageRestriction
    //             }
    //         });

    //         // Create the occurrences
    //         for (const slot of args.slots) {
    //             await createOccurrence(
    //                 experience._id,
    //                 experience.capacity,
    //                 slot.start,
    //                 slot.end
    //             );
    //         }

    //         return experienceReducer(experience);
    //     },

    //     createBooking: async (_, { occurrenceId, bookingType, numGuests, paymentIntentId }, { userId }) => {
    //         if (!userId) {
    //             throw new AuthenticationError("User isn't logged in.");
    //         }

    //         // Find the experience and the occurrence to book
    //         const occurrence = await Occurrence.findById(
    //             occurrenceId
    //         ).populate({
    //             path: 'experience',
    //             select: '_id creator price title location',
    //             populate: {
    //                 path: 'creator',
    //                 select: 'user bookingRequests',
    //                 populate: {
    //                     path: 'user',
    //                     select: '_id email phoneNumber'
    //                 }
    //             }
    //         });
    //         if (!occurrence) {
    //             throw new ApolloError('Occurrence not found.');
    //         }

    //         const experience = occurrence.experience as ExperienceType;
    //         const creator = experience.creator as CreatorType & Document;

    //         // Create booking
    //         const { creatorProfit } = computeBookingFees(
    //             Boolean(experience.location.meetPoint),
    //             bookingType,
    //             numGuests, 
    //             experience.price.perPerson,
    //             experience.price.private
    //         );

    //         const booking = await Booking.create({
    //             occurrence: occurrence._id,
    //             bookingType,
    //             numGuests,
    //             client: userId,
    //             stripe: {
    //                 paymentIntentId,
    //                 paymentCaptured: false,
    //                 creatorProfit
    //             }
    //         });

    //         // Add booking to occurrence and update capacity
    //         occurrence.spotsLeft = bookingType === 'private' ? 
    //             0 : occurrence.spotsLeft - numGuests;
    //         occurrence.bookings.push(booking._id);

    //         // Add booking to creator's requests
    //         creator.bookingRequests?.push(booking._id);

    //         // Get card info to display in the booking submitted page
    //         const { payment_method } = await stripe.paymentIntents.retrieve(paymentIntentId, {
    //             expand: ['payment_method']
    //         });

    //         // Add experience to user's booked experiences
    //         const client = await User.findByIdAndUpdate(userId, {
    //             $addToSet: { bookedExperiences: experience._id }
    //         }, { lean: true });

    //         // Save all changes
    //         await occurrence.save();
    //         await creator.save();

    //         // Send email notification to creator
    //         sendBookingNotificationEmail(
    //             client?.fstName || '',
    //             experience.title,
    //             `${process.env.CLIENT_URL!}/email/creator-requests/${userId}`,
    //             (creator.user as UserType).emailAddress
    //         );

    //         return {
    //             creatorPhone: (creator.user as UserType).phoneNumber!,
    //             meetingPoint: experience.location.meetPoint,
    //             cardBrand: (payment_method as Stripe.PaymentMethod).card?.brand || '',
    //             cardLast4: (payment_method as Stripe.PaymentMethod).card?.last4 || ''
    //         }
    //     },

    //     createOccurrence: async (_, { experienceId, experienceCapacity, dates }) => {
    //         const occurrence = await createOccurrence(
    //             experienceId,
    //             experienceCapacity,
    //             dates.start,
    //             dates.end
    //         );
    //         return occurrenceReducer(occurrence);
    //     },

    //     deleteOccurrence: async (_, { occurrenceId }) => {
    //         const occurrence = await Occurrence.findOneAndDelete({
    //             _id: occurrenceId,
    //             bookings: { $size: 0 }
    //         });
    //         return occurrenceReducer(occurrence);
    //     }
    }
}