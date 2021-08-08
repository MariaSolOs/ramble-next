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

export type UserAvatarFragment = (
  Pick<User, 'firstName'>
  & { photo?: Maybe<Pick<Image, 'src' | 'placeholder'>> }
);

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = { logInUser: CoreProfileFragment };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['ID'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { resetPassword: Pick<User, '_id' | 'email'> };

export type SaveExperienceMutationVariables = Exact<{
  experienceId: Scalars['ID'];
}>;


export type SaveExperienceMutation = { saveExperience: Pick<Experience, '_id'> };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignUpMutation = { signUpUser: CoreProfileFragment };

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

export type GetExperiencesQueryVariables = Exact<{
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['ID']>;
}>;


export type GetExperiencesQuery = { experiences: Array<CardContentFragment> };

export type GetFeaturedExperiencesQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetFeaturedExperiencesQuery = { experiencesById: Array<CardContentFragment> };

export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = { experiences: Array<Pick<Experience, 'location'>> };

export type GetUserSavedExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


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
export const LogInDocument = gql`
    mutation logIn($email: String!, $password: String!) {
  logInUser(email: $email, password: $password) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
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
export const SignUpDocument = gql`
    mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signUpUser(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    ...CoreProfile
  }
}
    ${CoreProfileFragmentDoc}`;
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
export const GetExperiencesDocument = gql`
    query getExperiences($location: String, $capacity: Int, $creatorId: ID) {
  experiences(location: $location, capacity: $capacity, creatorId: $creatorId) {
    ...CardContent
  }
}
    ${CardContentFragmentDoc}`;
export const GetFeaturedExperiencesDocument = gql`
    query getFeaturedExperiences($ids: [ID!]!) {
  experiencesById(ids: $ids) {
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
export const GetUserSavedExperiencesDocument = gql`
    query getUserSavedExperiences {
  me {
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
    logIn(variables: LogInMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogInMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogInMutation>(LogInDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logIn');
    },
    resetPassword(variables: ResetPasswordMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetPasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordMutation>(ResetPasswordDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'resetPassword');
    },
    saveExperience(variables: SaveExperienceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SaveExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SaveExperienceMutation>(SaveExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'saveExperience');
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
    getExperiences(variables?: GetExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperiencesQuery>(GetExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperiences');
    },
    getFeaturedExperiences(variables: GetFeaturedExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetFeaturedExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetFeaturedExperiencesQuery>(GetFeaturedExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getFeaturedExperiences');
    },
    getLocations(variables?: GetLocationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLocationsQuery>(GetLocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getLocations');
    },
    getUserSavedExperiences(variables?: GetUserSavedExperiencesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserSavedExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserSavedExperiencesQuery>(GetUserSavedExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserSavedExperiences');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useGetExperiences(key: SWRKeyInterface, variables?: GetExperiencesQueryVariables, config?: SWRConfigInterface<GetExperiencesQuery, ClientError>) {
      return useSWR<GetExperiencesQuery, ClientError>(key, () => sdk.getExperiences(variables), config);
    },
    useGetLocations(key: SWRKeyInterface, variables?: GetLocationsQueryVariables, config?: SWRConfigInterface<GetLocationsQuery, ClientError>) {
      return useSWR<GetLocationsQuery, ClientError>(key, () => sdk.getLocations(variables), config);
    },
    useGetUserSavedExperiences(key: SWRKeyInterface, variables?: GetUserSavedExperiencesQueryVariables, config?: SWRConfigInterface<GetUserSavedExperiencesQuery, ClientError>) {
      return useSWR<GetUserSavedExperiencesQuery, ClientError>(key, () => sdk.getUserSavedExperiences(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;