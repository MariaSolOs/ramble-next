import { GraphQLResolveInfo } from 'graphql';
import { ExperienceType, OccurrenceType, BookingType, UserType, CreatorType, Context } from 'models/codegen';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  src: Scalars['String'];
  placeholder: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** User sign up. */
  signUpUser: User;
  /** User log in. */
  logInUser: User;
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


export type MutationEditUserArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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
  /** Get experience by its ID. */
  experience: Experience;
  /** Get the occurrences of the indicated experiences. */
  occurrences: Array<Occurrence>;
};


export type QueryExperiencesArgs = {
  location?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  creatorId?: Maybe<Scalars['ID']>;
};


export type QueryExperienceArgs = {
  id: Scalars['ID'];
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
  photo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  savedExperiences: Array<Experience>;
  bookedExperiences: Array<Experience>;
  creator?: Maybe<Creator>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Booking: ResolverTypeWrapper<BookingType>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateBookingResult: ResolverTypeWrapper<CreateBookingResult>;
  Creator: ResolverTypeWrapper<CreatorType>;
  Experience: ResolverTypeWrapper<ExperienceType>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ExperienceCategory: ExperienceCategory;
  Image: ResolverTypeWrapper<Image>;
  Mutation: ResolverTypeWrapper<{}>;
  Occurrence: ResolverTypeWrapper<OccurrenceType>;
  OccurrenceInput: OccurrenceInput;
  Query: ResolverTypeWrapper<{}>;
  Reservation: Reservation;
  StripeInfo: ResolverTypeWrapper<StripeInfo>;
  User: ResolverTypeWrapper<UserType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Booking: BookingType;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  CreateBookingResult: CreateBookingResult;
  Creator: CreatorType;
  Experience: ExperienceType;
  Float: Scalars['Float'];
  Image: Image;
  Mutation: {};
  Occurrence: OccurrenceType;
  OccurrenceInput: OccurrenceInput;
  Query: {};
  StripeInfo: StripeInfo;
  User: UserType;
};

export type BookingResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  occurrence?: Resolver<ResolversTypes['Occurrence'], ParentType, ContextType>;
  bookingType?: Resolver<ResolversTypes['Reservation'], ParentType, ContextType>;
  numGuests?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  client?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  creatorProfit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentCaptured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBookingResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateBookingResult'] = ResolversParentTypes['CreateBookingResult']> = {
  meetingPoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creatorPhone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cardBrand?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cardLast4?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stripeProfile?: Resolver<ResolversTypes['StripeInfo'], ParentType, ContextType>;
  bookingRequests?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExperienceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Experience'] = ResolversParentTypes['Experience']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meetingPoint?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes['ExperienceCategory']>, ParentType, ContextType>;
  ageRestriction?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  includedItems?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  toBringItems?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  zoomPMI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pricePerPerson?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  privatePrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ratingValue?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  numberOfRatings?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  src?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  placeholder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signUpUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpUserArgs, 'email' | 'password' | 'firstName' | 'lastName'>>;
  logInUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLogInUserArgs, 'email' | 'password'>>;
  editUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditUserArgs, never>>;
  signUpCreator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType, RequireFields<MutationSignUpCreatorArgs, 'bio' | 'governmentIds'>>;
  saveExperience?: Resolver<ResolversTypes['Experience'], ParentType, ContextType, RequireFields<MutationSaveExperienceArgs, 'experienceId'>>;
  unsaveExperience?: Resolver<ResolversTypes['Experience'], ParentType, ContextType, RequireFields<MutationUnsaveExperienceArgs, 'experienceId'>>;
  createExperience?: Resolver<ResolversTypes['Experience'], ParentType, ContextType, RequireFields<MutationCreateExperienceArgs, 'title' | 'description' | 'images' | 'location' | 'categories' | 'duration' | 'languages' | 'includedItems' | 'toBringItems' | 'capacity' | 'pricePerPerson' | 'currency' | 'slots'>>;
  createBooking?: Resolver<ResolversTypes['CreateBookingResult'], ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'occurrenceId' | 'bookingType' | 'numGuests' | 'paymentIntentId'>>;
  createOccurrence?: Resolver<ResolversTypes['Occurrence'], ParentType, ContextType, RequireFields<MutationCreateOccurrenceArgs, 'experienceId' | 'experienceCapacity' | 'dates'>>;
  deleteOccurrence?: Resolver<ResolversTypes['Occurrence'], ParentType, ContextType, RequireFields<MutationDeleteOccurrenceArgs, 'occurrenceId'>>;
};

export type OccurrenceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Occurrence'] = ResolversParentTypes['Occurrence']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  experience?: Resolver<ResolversTypes['Experience'], ParentType, ContextType>;
  dateStart?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateEnd?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spotsLeft?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  creatorProfit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bookings?: Resolver<Array<ResolversTypes['Booking']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  experiences?: Resolver<Array<ResolversTypes['Experience']>, ParentType, ContextType, RequireFields<QueryExperiencesArgs, never>>;
  experience?: Resolver<ResolversTypes['Experience'], ParentType, ContextType, RequireFields<QueryExperienceArgs, 'id'>>;
  occurrences?: Resolver<Array<ResolversTypes['Occurrence']>, ParentType, ContextType, RequireFields<QueryOccurrencesArgs, 'experienceIds'>>;
};

export type StripeInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StripeInfo'] = ResolversParentTypes['StripeInfo']> = {
  onboarded?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  accountId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  savedExperiences?: Resolver<Array<ResolversTypes['Experience']>, ParentType, ContextType>;
  bookedExperiences?: Resolver<Array<ResolversTypes['Experience']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['Creator']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Booking?: BookingResolvers<ContextType>;
  CreateBookingResult?: CreateBookingResultResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  Experience?: ExperienceResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Occurrence?: OccurrenceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StripeInfo?: StripeInfoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
