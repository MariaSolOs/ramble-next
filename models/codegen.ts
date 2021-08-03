import {
    experienceReducer,
    occurrenceReducer,
    bookingReducer,
    userReducer,
    creatorReducer
} from 'utils/graphql-data-mappers';

export type Context = { userId: string; }

export type ExperienceType = ReturnType<typeof experienceReducer>;

export type OccurrenceType = ReturnType<typeof occurrenceReducer>;

export type BookingType = ReturnType<typeof bookingReducer>;

export type UserType = ReturnType<typeof userReducer>;

export type CreatorType = ReturnType<typeof creatorReducer>;