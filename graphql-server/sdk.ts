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
  placeholder: Scalars['String'];
  src: Scalars['String'];
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

/** Booking types */
export enum Reservation {
  Public = 'public',
  Private = 'private'
}

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
  Pick<Experience, '_id' | 'title' | 'description' | 'location' | 'latitude' | 'longitude' | 'categories' | 'ageRestriction' | 'duration' | 'languages' | 'includedItems' | 'toBringItems' | 'capacity' | 'isOnlineExperience' | 'pricePerPerson'>
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

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserProfileQuery = { me: (
    Pick<User, '_id' | 'lastName' | 'city' | 'email' | 'phoneNumber' | 'birthday'>
    & { creator?: Maybe<Pick<Creator, '_id' | 'bio'>> }
    & UserAvatarFragment
  ) };

export type GetUserSavedExperiencesQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserSavedExperiencesQuery = { me: { savedExperiences: Array<Pick<Experience, '_id'>> } };

export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  firstName
  photo {
    src
    placeholder
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
export const GetUserProfileDocument = gql`
    query getUserProfile($userId: ID!) {
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
export const GetUserSavedExperiencesDocument = gql`
    query getUserSavedExperiences($userId: ID!) {
  me(userId: $userId) {
    savedExperiences {
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
    getUserProfile(variables: GetUserProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserProfileQuery>(GetUserProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserProfile');
    },
    getUserSavedExperiences(variables: GetUserSavedExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserSavedExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserSavedExperiencesQuery>(GetUserSavedExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserSavedExperiences');
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
    useGetUserProfile(key: SWRKeyInterface, variables: GetUserProfileQueryVariables, config?: SWRConfigInterface<GetUserProfileQuery, ClientError>) {
      return useSWR<GetUserProfileQuery, ClientError>(key, () => sdk.getUserProfile(variables), config);
    },
    useGetUserSavedExperiences(key: SWRKeyInterface, variables: GetUserSavedExperiencesQueryVariables, config?: SWRConfigInterface<GetUserSavedExperiencesQuery, ClientError>) {
      return useSWR<GetUserSavedExperiencesQuery, ClientError>(key, () => sdk.getUserSavedExperiences(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;