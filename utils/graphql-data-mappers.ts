import type { Experience } from 'models/mongodb/experience';
import type { Occurrence } from 'models/mongodb/occurrence';
import type { Booking } from 'models/mongodb/booking';
import type { User } from 'models/mongodb/user';
import type { Creator } from 'models/mongodb/creator';

export const experienceReducer = (exp: Experience | null) => ({
    _id: exp?._id || '',
    title: exp?.title || '',
    description: exp?.description || '',
    images: exp?.images || [],
    location: exp?.location.displayLocation || '',
    meetingPoint: exp?.location.meetPoint || null,
    latitude: exp?.location.coordinates ? exp.location.coordinates.lat : null,
    longitude: exp?.location.coordinates ? exp.location.coordinates.long : null,
    categories: exp?.categories || [],
    ageRestriction: exp?.ageRestriction || null,
    duration: exp?.duration || 0,
    languages: exp?.languages || [],
    includedItems: exp?.included || [],
    toBringItems: exp?.toBring || [],
    capacity: exp?.capacity || 0,
    isOnlineExperience: Boolean(exp?.zoomInfo?.PMI),
    pricePerPerson: exp?.price.perPerson || 0,
    privatePrice: exp?.price.private || null,
    currency: exp?.price.currency || 'CAD',
    ratingValue: exp?.rating.value || null,
    creator: exp?.creator || ''
});

export const occurrenceReducer = (occ: Occurrence | null) => ({
    _id: occ?._id || '',
    experience: occ?.experience || '',
    dateStart: occ?.dateStart.toISOString() || '',
    dateEnd: occ?.dateEnd.toISOString() || '',
    spotsLeft: occ?.spotsLeft || 0,
    creatorProfit: occ?.creatorProfit || 0,
    bookings: occ?.bookings || []
});

export const bookingReducer = (booking: Booking | null) => ({
    _id: booking?._id || '',
    occurrence: booking?.occurrence || '',
    bookingType: booking?.bookingType || 'public',
    numGuests: booking?.numGuests || 0,
    client: booking?.client || '',
    creatorProfit: booking?.stripe.creatorProfit || 0,
    createdAt: booking?.createdAt.toISOString() || '',
    paymentCaptured: booking?.stripe.paymentCaptured || false
});

export const userReducer = (user: User | null) => ({
    _id: user?._id || '',
    firstName: user?.fstName || '',
    lastName: user?.lstName || '',
    birthday: user?.birthday?.toISOString().split('T')[0] || null,
    email: user?.emailAddress || '',
    phoneNumber: user?.phoneNumber || null,
    photo: user?.photo || null,
    city: user?.city || null,
    savedExperiences: user?.savedExperiences || [],
    bookedExperiences: user?.bookedExperiences || [],
    creator: user?.creator || null
});

export const creatorReducer = (creator: Creator | null) => ({
    _id: creator?._id || '',
    bio: creator?.bio || '',
    user: creator?.user || '',
    verified: creator?.verified || false,
    governmentIds: creator?.governmentIds || [],
    stripeProfile: {
        onboarded: creator?.stripe ? creator.stripe.onboarded : false,
        accountId: creator?.stripe ? creator.stripe.accountId : ''
    },
    bookingRequests: creator?.bookingRequests || []
});