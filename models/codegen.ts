import {
    experienceReducer,
    occurrenceReducer,
    bookingReducer,
    userReducer,
    creatorReducer,
    reviewReducer
} from 'lib/graphql';

export type Context = { userId: string; }

export type ExperienceType = ReturnType<typeof experienceReducer>;

export type OccurrenceType = ReturnType<typeof occurrenceReducer>;

// Name this one differently to avoid conflict with 'public' | 'private'
export type BookingGraphQLType = ReturnType<typeof bookingReducer>;

export type UserType = ReturnType<typeof userReducer>;

export type CreatorType = ReturnType<typeof creatorReducer>;

export type ReviewType = ReturnType<typeof reviewReducer>;