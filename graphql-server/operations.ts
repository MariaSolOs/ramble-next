import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  __typename?: 'Booking';
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
  __typename?: 'CreateBookingResult';
  meetingPoint?: Maybe<Scalars['String']>;
  creatorPhone: Scalars['String'];
  cardBrand: Scalars['String'];
  cardLast4: Scalars['String'];
};

/** Experience creators */
export type Creator = {
  __typename?: 'Creator';
  _id: Scalars['ID'];
  user: User;
  bio: Scalars['String'];
  stripeProfile: StripeInfo;
  bookingRequests: Array<Booking>;
};

/** Experience */
export type Experience = {
  __typename?: 'Experience';
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
  zoomPMI?: Maybe<Scalars['String']>;
  pricePerPerson: Scalars['Int'];
  privatePrice?: Maybe<Scalars['Int']>;
  currency: Scalars['String'];
  ratingValue: Scalars['Float'];
  numberOfRatings: Scalars['Int'];
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
  __typename?: 'Image';
  placeholder: Scalars['String'];
  src: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  experienceId: Scalars['String'];
};


export type MutationUnsaveExperienceArgs = {
  experienceId: Scalars['String'];
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
  __typename?: 'Occurrence';
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
  __typename?: 'Query';
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
  __typename?: 'StripeInfo';
  onboarded?: Maybe<Scalars['Boolean']>;
  accountId?: Maybe<Scalars['ID']>;
};

/** Application's users */
export type User = {
  __typename?: 'User';
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
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email'>
  & { creator?: Maybe<(
    { __typename?: 'Creator' }
    & Pick<Creator, '_id'>
  )> }
  & UserAvatarFragment
);

export type CardContentFragment = (
  { __typename?: 'Experience' }
  & Pick<Experience, '_id' | 'title' | 'pricePerPerson' | 'ratingValue' | 'numberOfRatings' | 'location' | 'zoomPMI'>
  & { images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'src' | 'placeholder'>
  )> }
);

export type UserAvatarFragment = (
  { __typename?: 'User' }
  & Pick<User, 'firstName'>
  & { photo?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'src' | 'placeholder'>
  )> }
);

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LogInMutation = (
  { __typename?: 'Mutation' }
  & { logInUser: (
    { __typename?: 'User' }
    & CoreProfileFragment
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['ID'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'User' }
    & Pick<User, '_id' | 'email'>
  ) }
);

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUpUser: (
    { __typename?: 'User' }
    & CoreProfileFragment
  ) }
);

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


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { editUser: (
    { __typename?: 'User' }
    & CoreProfileFragment
  ) }
);

export type GetFeaturedExperiencesQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type GetFeaturedExperiencesQuery = (
  { __typename?: 'Query' }
  & { experiencesById: Array<(
    { __typename?: 'Experience' }
    & CardContentFragment
  )> }
);

export type GetUserSavedExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserSavedExperiencesQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & { savedExperiences: Array<(
      { __typename?: 'Experience' }
      & Pick<Experience, '_id'>
    )> }
  ) }
);

export const UserAvatarFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserAvatar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}}]}}]}}]} as unknown as DocumentNode<UserAvatarFragment, unknown>;
export const CoreProfileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CoreProfile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserAvatar"}}]}},...UserAvatarFragmentDoc.definitions]} as unknown as DocumentNode<CoreProfileFragment, unknown>;
export const CardContentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardContent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Experience"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"placeholder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricePerPerson"}},{"kind":"Field","name":{"kind":"Name","value":"ratingValue"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfRatings"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"zoomPMI"}}]}}]} as unknown as DocumentNode<CardContentFragment, unknown>;
export const LogInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logInUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoreProfile"}}]}}]}},...CoreProfileFragmentDoc.definitions]} as unknown as DocumentNode<LogInMutation, LogInMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoreProfile"}}]}}]}},...CoreProfileFragmentDoc.definitions]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creatorBio"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"birthday"},"value":{"kind":"Variable","name":{"kind":"Name","value":"birthday"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"photo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photo"}}},{"kind":"Argument","name":{"kind":"Name","value":"phoneNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phoneNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"creatorBio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creatorBio"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CoreProfile"}}]}}]}},...CoreProfileFragmentDoc.definitions]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GetFeaturedExperiencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFeaturedExperiences"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"experiencesById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardContent"}}]}}]}},...CardContentFragmentDoc.definitions]} as unknown as DocumentNode<GetFeaturedExperiencesQuery, GetFeaturedExperiencesQueryVariables>;
export const GetUserSavedExperiencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserSavedExperiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savedExperiences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserSavedExperiencesQuery, GetUserSavedExperiencesQueryVariables>;