import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { ConfigInterface as SWRConfigInterface, keyInterface as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Bookings associated to an occurrence */
export type Booking = {
  _id: Scalars['ID'];
  occurrence: Occurrence;
  bookingType: Reservation;
  numGuests: Scalars['Int'];
  client: User;
  creatorProfit: Scalars['Int'];
  createdAt: Scalars['String'];
  paymentCaptured: Scalars['Boolean'];
};

/** Mutation results */
export type CreateBookingResult = {
  meetingPoint?: Maybe<Scalars['String']>;
  creatorPhone: Scalars['String'];
  cardBrand: Scalars['String'];
  cardLast4: Scalars['String'];
};

/** Experience creators */
export type Creator = {
  _id: Scalars['ID'];
  user: User;
  bio: Scalars['String'];
  stripeProfile: StripeInfo;
  bookingRequests: Array<Booking>;
};

/** Experience */
export type Experience = {
  _id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  images: Array<Image>;
  location: Scalars['String'];
  meetingPoint?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  categories: Array<ExperienceCategory>;
  ageRestriction?: Maybe<Scalars['Int']>;
  duration: Scalars['Float'];
  languages: Array<Scalars['String']>;
  includedItems: Array<Scalars['String']>;
  toBringItems: Array<Scalars['String']>;
  capacity: Scalars['Int'];
  isOnlineExperience: Scalars['Boolean'];
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  numRatings: Scalars['Int'];
  ratingValue?: Maybe<Scalars['Float']>;
  creator: Creator;
};

/** Ramble's experience categories */
export enum ExperienceCategory {
  Taste = 'taste',
  Create = 'create',
  Relax = 'relax',
  Learn = 'learn',
  Move = 'move'
}

/** Image with blurred placeholder */
export type Image = {
  src: Scalars['String'];
  placeholder: Scalars['String'];
};

export type Mutation = {
  /** User sign up. */
  signUpUser: User;
  /** User log in. */
  logInUser: User;
  /** Password reset. */
  resetPassword: User;
  /** Profile editing. */
  editUser: User;
  /** Creator onboarding. */
  signUpCreator: Creator;
  /** For users to save/unsave an experience. */
  saveExperience: Experience;
  unsaveExperience: Experience;
  /** Experience creation. */
  createExperience: Experience;
  /** Booking creation. */
  createBooking: CreateBookingResult;
  /** Creates a new occurrence for the indicated experience. */
  createOccurrence: Occurrence;
  /** Deletes an occurrence. */
  deleteOccurrence: Occurrence;
  /** Create a new review for the indicated experience. */
  createReview: Review;
};


export type MutationSignUpUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationLogInUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  userId: Scalars['ID'];
  password: Scalars['String'];
};


export type MutationEditUserArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  creatorBio?: Maybe<Scalars['String']>;
};


export type MutationSignUpCreatorArgs = {
  bio: Scalars['String'];
  governmentIds: Array<Scalars['String']>;
};


export type MutationSaveExperienceArgs = {
  experienceId: Scalars['ID'];
};


export type MutationUnsaveExperienceArgs = {
  experienceId: Scalars['ID'];
};


export type MutationCreateExperienceArgs = {
  title: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  location: Scalars['String'];
  meetingPoint?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  categories: Array<ExperienceCategory>;
  ageRestriction?: Maybe<Scalars['Int']>;
  duration: Scalars['Float'];
  languages: Array<Scalars['String']>;
  includedItems: Array<Scalars['String']>;
  toBringItems: Array<Scalars['String']>;
  capacity: Scalars['Int'];
  zoomPMI?: Maybe<Scalars['String']>;
  zoomPassword?: Maybe<Scalars['String']>;
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  slots: Array<OccurrenceInput>;
};


export type MutationCreateBookingArgs = {
  occurrenceId: Scalars['ID'];
  bookingType: Reservation;
  numGuests: Scalars['Int'];
  paymentIntentId: Scalars['ID'];
};


export type MutationCreateOccurrenceArgs = {
  experienceId: Scalars['ID'];
  experienceCapacity: Scalars['Int'];
  dates: OccurrenceInput;
};


export type MutationDeleteOccurrenceArgs = {
  occurrenceId: Scalars['ID'];
};


export type MutationCreateReviewArgs = {
  experienceId: Scalars['ID'];
  value: Scalars['Int'];
  text: Scalars['String'];
};

/**
 * Representation of a single occurrence in time of an
 * experience
 */
export type Occurrence = {
  _id: Scalars['ID'];
  experience: Experience;
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
  spotsLeft: Scalars['Int'];
  creatorProfit: Scalars['Int'];
  bookings: Array<Booking>;
};

/** Input types */
export type OccurrenceInput = {
  start: Scalars['String'];
  end: Scalars['String'];
};

export type Query = {
  /** The current logged in user. */
  me: User;
  /**
   * Experiences filtered by location and with capacity >= to
   * the indicated capacity, or those created by the specified creator.
   */
  experiences: Array<Experience>;
  /** Get experiences by their ID. */
  experiencesById: Array<Experience>;
  /** Get the occurrences of the indicated experiences. */
  occurrences: Array<Occurrence>;
  /** Get the reviews of a certain experience. */
  getReviews: Array<Review>;
};


export type QueryMeArgs = {
  userId: Scalars['ID'];
};


export type QueryExperiencesArgs = {
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['ID']>;
};


export type QueryExperiencesByIdArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryOccurrencesArgs = {
  experienceIds: Array<Scalars['ID']>;
};


export type QueryGetReviewsArgs = {
  experienceId: Scalars['ID'];
};

/** Booking types */
export enum Reservation {
  Public = 'public',
  Private = 'private'
}

/** Experience reviews */
export type Review = {
  _id: Scalars['ID'];
  experienceId: Scalars['ID'];
  writtenBy: Scalars['String'];
  text: Scalars['String'];
  value: Scalars['Int'];
};

/** Representation of a creator's Stripe profile */
export type StripeInfo = {
  onboarded?: Maybe<Scalars['Boolean']>;
  accountId?: Maybe<Scalars['ID']>;
};

/** Application's users */
export type User = {
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthday?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Image>;
  city?: Maybe<Scalars['String']>;
  savedExperiences: Array<Experience>;
  bookedExperiences: Array<Experience>;
  creator?: Maybe<Creator>;
};

export type BookingCardFragment = (
  Pick<Booking, '_id' | 'numGuests' | 'bookingType' | 'createdAt' | 'creatorProfit'>
  & { client: (
    Pick<User, 'city'>
    & UserAvatarFragment
  ), occurrence: (
    Pick<Occurrence, 'dateStart' | 'dateEnd' | 'creatorProfit'>
    & { experience: (
      Pick<Experience, '_id' | 'title' | 'capacity'>
      & { images: Array<Pick<Image, 'src' | 'placeholder'>> }
    ), bookings: Array<Pick<Booking, 'numGuests' | 'paymentCaptured'>> }
  ) }
);

export type CalendarOccurrenceFragment = (
  Pick<Occurrence, '_id' | 'dateStart' | 'dateEnd'>
  & { experience: Pick<Experience, '_id' | 'title'> }
);

export type CoreProfileFragment = (
  Pick<User, '_id' | 'email'>
  & { creator?: Maybe<Pick<Creator, '_id'>> }
  & UserAvatarFragment
);

export type CardContentFragment = (
  Pick<Experience, '_id' | 'title' | 'pricePerPerson' | 'ratingValue' | 'location' | 'isOnlineExperience'>
  & { images: Array<Pick<Image, 'src' | 'placeholder'>> }
);

export type ExperienceViewFragment = (
  Pick<Experience, '_id' | 'title' | 'description' | 'location' | 'latitude' | 'longitude' | 'categories' | 'ageRestriction' | 'duration' | 'languages' | 'includedItems' | 'toBringItems' | 'capacity' | 'isOnlineExperience' | 'pricePerPerson' | 'ratingValue' | 'numRatings'>
  & { images: Array<Pick<Image, 'src' | 'placeholder'>>, creator: (
    Pick<Creator, 'bio'>
    & { user: UserAvatarFragment }
  ) }
);

export type UserAvatarFragment = (
  Pick<User, 'firstName'>
  & { photo?: Maybe<Pick<Image, 'src' | 'placeholder'>> }
);

export type CreateBookingMutationVariables = Exact<{
  occurrenceId: Scalars['ID'];
  bookingType: Reservation;
  numGuests: Scalars['Int'];
  paymentIntentId: Scalars['ID'];
}>;


export type CreateBookingMutation = { createBooking: Pick<CreateBookingResult, 'meetingPoint' | 'creatorPhone' | 'cardBrand' | 'cardLast4'> };

export type CreateExperienceMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  images: Array<Scalars['String']> | Scalars['String'];
  location: Scalars['String'];
  meetingPoint?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  categories: Array<ExperienceCategory> | ExperienceCategory;
  ageRestriction?: Maybe<Scalars['Int']>;
  duration: Scalars['Float'];
  languages: Array<Scalars['String']> | Scalars['String'];
  includedItems: Array<Scalars['String']> | Scalars['String'];
  toBringItems: Array<Scalars['String']> | Scalars['String'];
  capacity: Scalars['Int'];
  zoomPMI?: Maybe<Scalars['String']>;
  zoomPassword?: Maybe<Scalars['String']>;
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  slots: Array<OccurrenceInput> | OccurrenceInput;
}>;


export type CreateExperienceMutation = { createExperience: Pick<Experience, '_id' | 'title'> };

export type CreateOccurrenceMutationVariables = Exact<{
  experienceId: Scalars['ID'];
  experienceCapacity: Scalars['Int'];
  dates: OccurrenceInput;
}>;


export type CreateOccurrenceMutation = { createOccurrence: CalendarOccurrenceFragment };

export type CreateReviewMutationVariables = Exact<{
  experienceId: Scalars['ID'];
  value: Scalars['Int'];
  text: Scalars['String'];
}>;


export type CreateReviewMutation = { createReview: Pick<Review, '_id'> };

export type DeleteOccurrenceMutationVariables = Exact<{
  occurrenceId: Scalars['ID'];
}>;


export type DeleteOccurrenceMutation = { deleteOccurrence: Pick<Occurrence, 'dateStart' | '_id'> };

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { logInUser: Pick<User, '_id'> };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['ID'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { resetPassword: Pick<User, '_id' | 'email'> };

export type SaveExperienceMutationVariables = Exact<{
  experienceId: Scalars['ID'];
}>;


export type SaveExperienceMutation = { saveExperience: Pick<Experience, '_id'> };

export type SignUpCreatorMutationVariables = Exact<{
  bio: Scalars['String'];
  governmentIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type SignUpCreatorMutation = { signUpCreator: Pick<Creator, '_id'> };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type SignUpMutation = { signUpUser: Pick<User, '_id'> };

export type UnsaveExperienceMutationVariables = Exact<{
  experienceId: Scalars['ID'];
}>;


export type UnsaveExperienceMutation = { unsaveExperience: Pick<Experience, '_id'> };

export type UpdateProfileMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  creatorBio?: Maybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { editUser: CoreProfileFragment };

export type GetBookingExperienceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBookingExperienceQuery = { experiencesById: Array<(
    Pick<Experience, 'privatePrice' | 'currency'>
    & ExperienceViewFragment
  )> };

export type GetBookingOccurrencesQueryVariables = Exact<{
  experienceIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetBookingOccurrencesQuery = { occurrences: Array<Pick<Occurrence, '_id' | 'dateStart' | 'dateEnd' | 'spotsLeft'>> };

export type GetBookingRequestsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetBookingRequestsQuery = { me: { creator?: Maybe<{ bookingRequests: Array<BookingCardFragment> }> } };

export type GetCoreProfileQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetCoreProfileQuery = { me: CoreProfileFragment };

export type GetCreationProfileQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetCreationProfileQuery = { me: (
    { creator?: Maybe<(
      Pick<Creator, '_id' | 'bio'>
      & { stripeProfile: Pick<StripeInfo, 'onboarded'> }
    )> }
    & UserAvatarFragment
  ) };

export type GetCreatorFormFieldsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetCreatorFormFieldsQuery = { me: (
    Pick<User, '_id' | 'phoneNumber'>
    & UserAvatarFragment
  ) };

export type GetExperiencesByIdQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetExperiencesByIdQuery = { experiencesById: Array<ExperienceViewFragment> };

export type GetExperiencesQueryVariables = Exact<{
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['ID']>;
}>;


export type GetExperiencesQuery = { experiences: Array<CardContentFragment> };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { experiences: Array<Pick<Experience, 'location'>> };

export type GetProfileExperiencesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetProfileExperiencesQuery = { me: (
    Pick<User, '_id' | 'city'>
    & { savedExperiences: Array<CardContentFragment>, bookedExperiences: Array<CardContentFragment> }
    & UserAvatarFragment
  ) };

export type GetProfileInformationQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetProfileInformationQuery = { me: (
    Pick<User, '_id' | 'lastName' | 'city' | 'email' | 'phoneNumber' | 'birthday'>
    & { creator?: Maybe<Pick<Creator, '_id' | 'bio'>> }
    & UserAvatarFragment
  ) };

export type GetReviewsQueryVariables = Exact<{
  experienceId: Scalars['ID'];
}>;


export type GetReviewsQuery = { getReviews: Array<Pick<Review, '_id' | 'writtenBy' | 'text' | 'value'>> };

export type GetSlotableExperiencesQueryVariables = Exact<{
  creatorId: Scalars['ID'];
}>;


export type GetSlotableExperiencesQuery = { experiences: Array<Pick<Experience, '_id' | 'title' | 'duration' | 'capacity'>> };

export type GetSlotableOccurrencesQueryVariables = Exact<{
  experienceIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetSlotableOccurrencesQuery = { occurrences: Array<(
    { bookings: Array<(
      Pick<Booking, '_id' | 'numGuests' | 'bookingType'>
      & { client: (
        Pick<User, 'firstName' | 'phoneNumber'>
        & { photo?: Maybe<Pick<Image, 'src' | 'placeholder'>> }
      ) }
    )> }
    & CalendarOccurrenceFragment
  )> };

export type GetUserExperiencesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserExperiencesQuery = { me: { savedExperiences: Array<Pick<Experience, '_id'>>, bookedExperiences: Array<Pick<Experience, '_id'>> } };

export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  firstName
  photo {
    src
    placeholder
  }
}
    `;
export const BookingCardFragmentDoc = gql`
    fragment BookingCard on Booking {
  _id
  numGuests
  bookingType
  createdAt
  creatorProfit
  client {
    ...UserAvatar
    city
  }
  occurrence {
    dateStart
    dateEnd
    creatorProfit
    experience {
      _id
      images {
        src
        placeholder
      }
      title
      capacity
    }
    bookings {
      numGuests
      paymentCaptured
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const CalendarOccurrenceFragmentDoc = gql`
    fragment CalendarOccurrence on Occurrence {
  _id
  dateStart
  dateEnd
  experience {
    _id
    title
  }
}
    `;
export const CoreProfileFragmentDoc = gql`
    fragment CoreProfile on User {
  _id
  email
  creator {
    _id
  }
  ...UserAvatar
}
    ${UserAvatarFragmentDoc}`;
export const CardContentFragmentDoc = gql`
    fragment CardContent on Experience {
  _id
  title
  images {
    src
    placeholder
  }
  pricePerPerson
  ratingValue
  location
  isOnlineExperience
}
    `;
export const ExperienceViewFragmentDoc = gql`
    fragment ExperienceView on Experience {
  _id
  title
  description
  images {
    src
    placeholder
  }
  location
  latitude
  longitude
  categories
  ageRestriction
  duration
  languages
  includedItems
  toBringItems
  capacity
  isOnlineExperience
  pricePerPerson
  ratingValue
  numRatings
  creator {
    bio
    user {
      ...UserAvatar
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const CreateBookingDocument = gql`
    mutation createBooking($occurrenceId: ID!, $bookingType: Reservation!, $numGuests: Int!, $paymentIntentId: ID!) {
  createBooking(
    occurrenceId: $occurrenceId
    bookingType: $bookingType
    numGuests: $numGuests
    paymentIntentId: $paymentIntentId
  ) {
    meetingPoint
    creatorPhone
    cardBrand
    cardLast4
  }
}
    `;
export const CreateExperienceDocument = gql`
    mutation createExperience($title: String!, $description: String!, $images: [String!]!, $location: String!, $meetingPoint: String, $latitude: Float, $longitude: Float, $categories: [ExperienceCategory!]!, $ageRestriction: Int, $duration: Float!, $languages: [String!]!, $includedItems: [String!]!, $toBringItems: [String!]!, $capacity: Int!, $zoomPMI: String, $zoomPassword: String, $pricePerPerson: Int!, $privatePrice: Int, $currency: String!, $slots: [OccurrenceInput!]!) {
  createExperience(
    title: $title
    description: $description
    images: $images
    location: $location
    meetingPoint: $meetingPoint
    latitude: $latitude
    longitude: $longitude
    categories: $categories
    ageRestriction: $ageRestriction
    duration: $duration
    languages: $languages
    includedItems: $includedItems
    toBringItems: $toBringItems
    capacity: $capacity
    zoomPMI: $zoomPMI
    zoomPassword: $zoomPassword
    pricePerPerson: $pricePerPerson
    privatePrice: $privatePrice
    currency: $currency
    slots: $slots
  ) {
    _id
    title
  }
}
    `;
export const CreateOccurrenceDocument = gql`
    mutation createOccurrence($experienceId: ID!, $experienceCapacity: Int!, $dates: OccurrenceInput!) {
  createOccurrence(
    experienceId: $experienceId
    experienceCapacity: $experienceCapacity
    dates: $dates
  ) {
    ...CalendarOccurrence
  }
}
    ${CalendarOccurrenceFragmentDoc}`;
export const CreateReviewDocument = gql`
    mutation createReview($experienceId: ID!, $value: Int!, $text: String!) {
  createReview(experienceId: $experienceId, value: $value, text: $text) {
    _id
  }
}
    `;
export const DeleteOccurrenceDocument = gql`
    mutation deleteOccurrence($occurrenceId: ID!) {
  deleteOccurrence(occurrenceId: $occurrenceId) {
    dateStart
    _id
  }
}
    `;
export const LogInDocument = gql`
    mutation logIn($email: String!, $password: String!) {
  logInUser(email: $email, password: $password) {
    _id
  }
}
    `;
export const ResetPasswordDocument = gql`
    mutation resetPassword($userId: ID!, $password: String!) {
  resetPassword(userId: $userId, password: $password) {
    _id
    email
  }
}
    `;
export const SaveExperienceDocument = gql`
    mutation saveExperience($experienceId: ID!) {
  saveExperience(experienceId: $experienceId) {
    _id
  }
}
    `;
export const SignUpCreatorDocument = gql`
    mutation signUpCreator($bio: String!, $governmentIds: [String!]!) {
  signUpCreator(bio: $bio, governmentIds: $governmentIds) {
    _id
  }
}
    `;
export const SignUpDocument = gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!, $phoneNumber: String!) {
  signUpUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    phoneNumber: $phoneNumber
  ) {
    _id
  }
}
    `;
export const UnsaveExperienceDocument = gql`
    mutation unsaveExperience($experienceId: ID!) {
  unsaveExperience(experienceId: $experienceId) {
    _id
  }
}
    `;
export const UpdateProfileDocument = gql`
    mutation updateProfile($firstName: String, $lastName: String, $birthday: String, $email: String, $photo: String, $phoneNumber: String, $city: String, $creatorBio: String) {
  editUser(
    firstName: $firstName
    lastName: $lastName
    birthday: $birthday
    email: $email
    photo: $photo
    phoneNumber: $phoneNumber
    city: $city
    creatorBio: $creatorBio
  ) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
export const GetBookingExperienceDocument = gql`
    query getBookingExperience($id: ID!) {
  experiencesById(ids: [$id]) {
    ...ExperienceView
    privatePrice
    currency
  }
}
    ${ExperienceViewFragmentDoc}`;
export const GetBookingOccurrencesDocument = gql`
    query getBookingOccurrences($experienceIds: [ID!]!) {
  occurrences(experienceIds: $experienceIds) {
    _id
    dateStart
    dateEnd
    spotsLeft
  }
}
    `;
export const GetBookingRequestsDocument = gql`
    query getBookingRequests($userId: ID!) {
  me(userId: $userId) {
    creator {
      bookingRequests {
        ...BookingCard
      }
    }
  }
}
    ${BookingCardFragmentDoc}`;
export const GetCoreProfileDocument = gql`
    query getCoreProfile($userId: ID!) {
  me(userId: $userId) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
export const GetCreationProfileDocument = gql`
    query getCreationProfile($userId: ID!) {
  me(userId: $userId) {
    ...UserAvatar
    creator {
      _id
      bio
      stripeProfile {
        onboarded
      }
    }
  }
}
    ${UserAvatarFragmentDoc}`;
export const GetCreatorFormFieldsDocument = gql`
    query getCreatorFormFields($userId: ID!) {
  me(userId: $userId) {
    _id
    phoneNumber
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const GetExperiencesByIdDocument = gql`
    query getExperiencesById($ids: [ID!]!) {
  experiencesById(ids: $ids) {
    ...ExperienceView
  }
}
    ${ExperienceViewFragmentDoc}`;
export const GetExperiencesDocument = gql`
    query getExperiences($location: String, $capacity: Int, $creatorId: ID) {
  experiences(location: $location, capacity: $capacity, creatorId: $creatorId) {
    ...CardContent
  }
}
    ${CardContentFragmentDoc}`;
export const GetLocationsDocument = gql`
    query getLocations {
  experiences {
    location
  }
}
    `;
export const GetProfileExperiencesDocument = gql`
    query getProfileExperiences($userId: ID!) {
  me(userId: $userId) {
    _id
    city
    savedExperiences {
      ...CardContent
    }
    bookedExperiences {
      ...CardContent
    }
    ...UserAvatar
  }
}
    ${CardContentFragmentDoc}
${UserAvatarFragmentDoc}`;
export const GetProfileInformationDocument = gql`
    query getProfileInformation($userId: ID!) {
  me(userId: $userId) {
    _id
    lastName
    city
    email
    phoneNumber
    birthday
    creator {
      _id
      bio
    }
    ...UserAvatar
  }
}
    ${UserAvatarFragmentDoc}`;
export const GetReviewsDocument = gql`
    query getReviews($experienceId: ID!) {
  getReviews(experienceId: $experienceId) {
    _id
    writtenBy
    text
    value
  }
}
    `;
export const GetSlotableExperiencesDocument = gql`
    query getSlotableExperiences($creatorId: ID!) {
  experiences(creatorId: $creatorId) {
    _id
    title
    duration
    capacity
  }
}
    `;
export const GetSlotableOccurrencesDocument = gql`
    query getSlotableOccurrences($experienceIds: [ID!]!) {
  occurrences(experienceIds: $experienceIds) {
    ...CalendarOccurrence
    bookings {
      _id
      numGuests
      bookingType
      client {
        firstName
        phoneNumber
        photo {
          src
          placeholder
        }
      }
    }
  }
}
    ${CalendarOccurrenceFragmentDoc}`;
export const GetUserExperiencesDocument = gql`
    query getUserExperiences($userId: ID!) {
  me(userId: $userId) {
    savedExperiences {
      _id
    }
    bookedExperiences {
      _id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createBooking(variables: CreateBookingMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateBookingMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateBookingMutation>(CreateBookingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createBooking');
    },
    createExperience(variables: CreateExperienceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateExperienceMutation>(CreateExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createExperience');
    },
    createOccurrence(variables: CreateOccurrenceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOccurrenceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOccurrenceMutation>(CreateOccurrenceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createOccurrence');
    },
    createReview(variables: CreateReviewMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateReviewMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateReviewMutation>(CreateReviewDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createReview');
    },
    deleteOccurrence(variables: DeleteOccurrenceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteOccurrenceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteOccurrenceMutation>(DeleteOccurrenceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteOccurrence');
    },
    logIn(variables: LogInMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogInMutation>(LogInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logIn');
    },
    resetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetPassword');
    },
    saveExperience(variables: SaveExperienceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SaveExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SaveExperienceMutation>(SaveExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'saveExperience');
    },
    signUpCreator(variables: SignUpCreatorMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignUpCreatorMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignUpCreatorMutation>(SignUpCreatorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signUpCreator');
    },
    signUp(variables: SignUpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SignUpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SignUpMutation>(SignUpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'signUp');
    },
    unsaveExperience(variables: UnsaveExperienceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UnsaveExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UnsaveExperienceMutation>(UnsaveExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unsaveExperience');
    },
    updateProfile(variables?: UpdateProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileMutation>(UpdateProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProfile');
    },
    getBookingExperience(variables: GetBookingExperienceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBookingExperienceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBookingExperienceQuery>(GetBookingExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBookingExperience');
    },
    getBookingOccurrences(variables: GetBookingOccurrencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBookingOccurrencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBookingOccurrencesQuery>(GetBookingOccurrencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBookingOccurrences');
    },
    getBookingRequests(variables: GetBookingRequestsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetBookingRequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetBookingRequestsQuery>(GetBookingRequestsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getBookingRequests');
    },
    getCoreProfile(variables: GetCoreProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCoreProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCoreProfileQuery>(GetCoreProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCoreProfile');
    },
    getCreationProfile(variables: GetCreationProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreationProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreationProfileQuery>(GetCreationProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCreationProfile');
    },
    getCreatorFormFields(variables: GetCreatorFormFieldsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCreatorFormFieldsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCreatorFormFieldsQuery>(GetCreatorFormFieldsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCreatorFormFields');
    },
    getExperiencesById(variables: GetExperiencesByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExperiencesByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperiencesByIdQuery>(GetExperiencesByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperiencesById');
    },
    getExperiences(variables?: GetExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperiencesQuery>(GetExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperiences');
    },
    getLocations(variables?: GetLocationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLocationsQuery>(GetLocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLocations');
    },
    getProfileExperiences(variables: GetProfileExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProfileExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileExperiencesQuery>(GetProfileExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProfileExperiences');
    },
    getProfileInformation(variables: GetProfileInformationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProfileInformationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileInformationQuery>(GetProfileInformationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProfileInformation');
    },
    getReviews(variables: GetReviewsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetReviewsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetReviewsQuery>(GetReviewsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getReviews');
    },
    getSlotableExperiences(variables: GetSlotableExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSlotableExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSlotableExperiencesQuery>(GetSlotableExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSlotableExperiences');
    },
    getSlotableOccurrences(variables: GetSlotableOccurrencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetSlotableOccurrencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSlotableOccurrencesQuery>(GetSlotableOccurrencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSlotableOccurrences');
    },
    getUserExperiences(variables: GetUserExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserExperiencesQuery>(GetUserExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserExperiences');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useGetBookingExperience(key: SWRKeyInterface, variables: GetBookingExperienceQueryVariables, config?: SWRConfigInterface<GetBookingExperienceQuery, ClientError>) {
      return useSWR<GetBookingExperienceQuery, ClientError>(key, () => sdk.getBookingExperience(variables), config);
    },
    useGetBookingOccurrences(key: SWRKeyInterface, variables: GetBookingOccurrencesQueryVariables, config?: SWRConfigInterface<GetBookingOccurrencesQuery, ClientError>) {
      return useSWR<GetBookingOccurrencesQuery, ClientError>(key, () => sdk.getBookingOccurrences(variables), config);
    },
    useGetBookingRequests(key: SWRKeyInterface, variables: GetBookingRequestsQueryVariables, config?: SWRConfigInterface<GetBookingRequestsQuery, ClientError>) {
      return useSWR<GetBookingRequestsQuery, ClientError>(key, () => sdk.getBookingRequests(variables), config);
    },
    useGetCoreProfile(key: SWRKeyInterface, variables: GetCoreProfileQueryVariables, config?: SWRConfigInterface<GetCoreProfileQuery, ClientError>) {
      return useSWR<GetCoreProfileQuery, ClientError>(key, () => sdk.getCoreProfile(variables), config);
    },
    useGetCreationProfile(key: SWRKeyInterface, variables: GetCreationProfileQueryVariables, config?: SWRConfigInterface<GetCreationProfileQuery, ClientError>) {
      return useSWR<GetCreationProfileQuery, ClientError>(key, () => sdk.getCreationProfile(variables), config);
    },
    useGetCreatorFormFields(key: SWRKeyInterface, variables: GetCreatorFormFieldsQueryVariables, config?: SWRConfigInterface<GetCreatorFormFieldsQuery, ClientError>) {
      return useSWR<GetCreatorFormFieldsQuery, ClientError>(key, () => sdk.getCreatorFormFields(variables), config);
    },
    useGetExperiencesById(key: SWRKeyInterface, variables: GetExperiencesByIdQueryVariables, config?: SWRConfigInterface<GetExperiencesByIdQuery, ClientError>) {
      return useSWR<GetExperiencesByIdQuery, ClientError>(key, () => sdk.getExperiencesById(variables), config);
    },
    useGetExperiences(key: SWRKeyInterface, variables?: GetExperiencesQueryVariables, config?: SWRConfigInterface<GetExperiencesQuery, ClientError>) {
      return useSWR<GetExperiencesQuery, ClientError>(key, () => sdk.getExperiences(variables), config);
    },
    useGetLocations(key: SWRKeyInterface, variables?: GetLocationsQueryVariables, config?: SWRConfigInterface<GetLocationsQuery, ClientError>) {
      return useSWR<GetLocationsQuery, ClientError>(key, () => sdk.getLocations(variables), config);
    },
    useGetProfileExperiences(key: SWRKeyInterface, variables: GetProfileExperiencesQueryVariables, config?: SWRConfigInterface<GetProfileExperiencesQuery, ClientError>) {
      return useSWR<GetProfileExperiencesQuery, ClientError>(key, () => sdk.getProfileExperiences(variables), config);
    },
    useGetProfileInformation(key: SWRKeyInterface, variables: GetProfileInformationQueryVariables, config?: SWRConfigInterface<GetProfileInformationQuery, ClientError>) {
      return useSWR<GetProfileInformationQuery, ClientError>(key, () => sdk.getProfileInformation(variables), config);
    },
    useGetReviews(key: SWRKeyInterface, variables: GetReviewsQueryVariables, config?: SWRConfigInterface<GetReviewsQuery, ClientError>) {
      return useSWR<GetReviewsQuery, ClientError>(key, () => sdk.getReviews(variables), config);
    },
    useGetSlotableExperiences(key: SWRKeyInterface, variables: GetSlotableExperiencesQueryVariables, config?: SWRConfigInterface<GetSlotableExperiencesQuery, ClientError>) {
      return useSWR<GetSlotableExperiencesQuery, ClientError>(key, () => sdk.getSlotableExperiences(variables), config);
    },
    useGetSlotableOccurrences(key: SWRKeyInterface, variables: GetSlotableOccurrencesQueryVariables, config?: SWRConfigInterface<GetSlotableOccurrencesQuery, ClientError>) {
      return useSWR<GetSlotableOccurrencesQuery, ClientError>(key, () => sdk.getSlotableOccurrences(variables), config);
    },
    useGetUserExperiences(key: SWRKeyInterface, variables: GetUserExperiencesQueryVariables, config?: SWRConfigInterface<GetUserExperiencesQuery, ClientError>) {
      return useSWR<GetUserExperiencesQuery, ClientError>(key, () => sdk.getUserExperiences(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;