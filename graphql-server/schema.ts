import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Query {
        """
        The current logged in user.
        """
        me(userId: ID!): User!

        """
        Experiences filtered by location and with capacity >= to 
        the indicated capacity, or those created by the specified creator.
        """
        experiences(
            location: String,
            capacity: Int,
            creatorId: ID
        ): [Experience!]!

        """
        Get experiences by their ID.
        """
        experiencesById(ids: [ID!]!): [Experience!]!

        """
        Get the occurrences of the indicated experiences.
        """
        occurrences(experienceIds: [ID!]!): [Occurrence!]!

        """
        Get the reviews of a certain experience.
        """
        getReviews(experienceId: ID!): [Review!]!
    }

    type Mutation {
        """
        User sign up.
        """
        signUpUser(
            email: String!, 
            password: String!, 
            firstName: String!, 
            lastName: String!,
            phoneNumber: String!
        ): User!

        """
        User log in.
        """
        logInUser(
            email: String!, 
            password: String!
        ): User!

        """
        Password reset.
        """
        resetPassword(
            userId: ID!,
            password: String!
        ): User!

        """
        Profile editing.
        """
        editUser(
            firstName: String, 
            lastName: String, 
            birthday: String, 
            email: String, 
            photo: String,
            phoneNumber: String,
            city: String,
            creatorBio: String
        ): User!

        """
        Creator onboarding.
        """
        signUpCreator(
            bio: String!,
            governmentIds: [String!]!
        ): Creator!

        """
        For users to save/unsave an experience.
        """
        saveExperience(experienceId: ID!): Experience!
        unsaveExperience(experienceId: ID!): Experience!
        
        """
        Experience creation.
        """
        createExperience(
            title: String!,
            description: String!,
            images: [String!]!,
            location: String!,
            meetingPoint: String,
            latitude: Float,
            longitude: Float,
            categories: [ExperienceCategory!]!,
            ageRestriction: Int,
            duration: Float!,
            languages: [String!]!,
            includedItems: [String!]!,
            toBringItems: [String!]!,
            capacity: Int!,
            zoomPMI: String,
            zoomPassword: String,
            pricePerPerson: Int!,
            privatePrice: Int,
            currency: Currency!,
            slots: [OccurrenceInput!]!
        ): Experience!

        """
        Experience editing.
        """
        editExperience(
            _id: ID!,
            description: String,
            images: [String!],
            meetingPoint: String,
            latitude: Float,
            longitude: Float,
            ageRestriction: Int,
            duration: Float,
            languages: [String!],
            includedItems: [String!],
            toBringItems: [String!],
            pricePerPerson: Int,
            privatePrice: Int,
            currency: Currency
        ): Experience!

        """
        Booking creation.
        """
        createBooking(
            occurrenceId: ID!,
            bookingType: BookingType!,
            numGuests: Int!,
            paymentIntentId: ID!
        ): CreateBookingResult!

        """
        Creates a new occurrence for the indicated experience.
        """
        createOccurrence(
            experienceId: ID!,
            experienceCapacity: Int!,
            dates: OccurrenceInput!
        ): Occurrence!

        """
        Deletes an occurrence.
        """
        deleteOccurrence(occurrenceId: ID!): Occurrence!

        """
        Create a new review for the indicated experience.
        """
        createReview(
            experienceId: ID!,
            value: Int!, 
            text: String!
        ): Review!
    }

    """
    Input types
    """
    input OccurrenceInput {
        start: String!
        end: String!
    }

    """
    Mutation results
    """
    type CreateBookingResult {
        meetingPoint: String
        creatorPhone: String!
        cardBrand: String!
        cardLast4: String!
    }

    """
    Ramble's experience categories
    """
    enum ExperienceCategory {
        taste
        create
        relax
        learn
        move
    }

    """
    Supported currencies
    """
    enum Currency {
        CAD
        USD
    }

    """
    Booking types
    """
    enum BookingType {
        public
        private
    }

    """
    Image with blurred placeholder
    """
    type Image {
        src: String!
        placeholder: String!
    }

    """
    Experience
    """
    type Experience {
        _id: ID!
        title: String!
        description: String!
        images: [Image!]!
        location: String!
        meetingPoint: String
        latitude: Float
        longitude: Float
        categories: [ExperienceCategory!]!
        ageRestriction: Int
        duration: Float!
        languages: [String!]!
        includedItems: [String!]!
        toBringItems: [String!]!
        capacity: Int!
        isOnlineExperience: Boolean!
        pricePerPerson: Int!
        privatePrice: Int
        currency: Currency!
        numRatings: Int!
        ratingValue: Float
        creator: Creator!
    }

    """
    Representation of a single occurrence in time of an
    experience
    """
    type Occurrence {
        _id: ID!
        experience: Experience!
        dateStart: String!
        dateEnd: String!
        spotsLeft: Int!
        creatorProfit: Int!
        bookings: [Booking!]!
    }

    """
    Bookings associated to an occurrence
    """
    type Booking {
        _id: ID!
        occurrence: Occurrence!
        bookingType: BookingType!
        numGuests: Int!
        client: User!
        creatorProfit: Int!
        createdAt: String!
        paymentCaptured: Boolean!
    }

    """
    Application's users
    """
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        birthday: String
        email: String!
        phoneNumber: String
        photo: Image
        city: String
        savedExperiences: [Experience!]!
        bookedExperiences: [Experience!]!
        creator: Creator
    }

    """
    Experience creators
    """
    type Creator {
        _id: ID!
        user: User!
        bio: String!
        stripeProfile: StripeInfo!
        bookingRequests: [Booking!]!
    }

    """
    Experience reviews
    """
    type Review {
        _id: ID!
        experience: ID!
        writtenBy: String!
        text: String!
        value: Int!
    }

    """
    Representation of a creator's Stripe profile
    """
    type StripeInfo {
        onboarded: Boolean
        accountId: ID
    }
`;