import type { TranslationRecord } from 'models/translation';

const englishTranslation: TranslationRecord = {
    Home: {
        experienceTitle: 'Unique experiences that mean',
        discoverTitle: 'Discover unique experiences in Montréal',
        seeAllButton: 'See all',
        partakeTitle: 'Partake in unforgettable moments',
        partakeSubtitle: 'Experiences are unique activities organized by passionate Creators who wish to share their expertise and give their guests a privileged access to their universe.',
        adventureTitle: 'With friends, family, on your own, or with your significant other.',
        adventureSubtitle: 'Turn every occasion into a memorable adventure.',
        onboardingReturnSuccess: "Congrats! You've completed your onboarding with Stripe.",
        onboardingReturnFailure: "It seems like you couldn't complete your Stripe onboarding! If you need help, please let us know."
    },

    Navbar: {
        languageChip: 'FR',
        signUp: 'Sign up',
        logIn: 'Log in',
        becomeCreator: 'Become a Creator',
        creatorDashboard: 'Creator dashboard'
    },

    NavbarProfileMenu: {
        profile: 'View Profile',
        newExperience: 'New Experience',
        languageChip: 'Français',
        logout: 'Logout'
    },

    Footer: {
        supportColumnName: 'Support',
        supportLink: '24/7 Customer Service',
        socialColumnName: 'Social',
        languageColumnName: 'Language',
        languageChip: 'Français',
        copyright: 'Ramble Technologies Inc'
    },

    CustomerServiceDialog: {
        title: 'Customer service',
        message: '24/7 service to help you anywhere, anytime'
    },

    SignUpDialog: {
        signUp: 'Sign up', 
        logIn: 'Log in',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phoneNumber: 'Phone number',
        password: 'Password',
        confirmPassword: 'Confirm password',
        alreadyHaveAccount: 'Already have an account?',
        continue: 'Continue',
        passwordMismatch: "The passwords don't match."
    },

    LogInDialog: {
        logIn: 'Log in',
        signUp: 'Sign up',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'I forgot my password',
        noAccountYet: "Don't have an account yet?"
    },

    ForgotPasswordDialog: {
        enterEmailTitle: 'Enter your email address',
        sendLinkMessage: "We'll send you a link so that you can create a new password.",
        resetPassword: 'Reset my password',
        emailSent: 'The email is on its way!'
    },

    ResetPasswordDialog: {
        newPassword: 'New password',
        confirmPassword: 'Confirm your new password',
        resetPassword: 'Reset my password',
        passwordMismatch: "The passwords don't match."
    },

    ErrorDialog: {
        title: "Sorry 'bout that."
    },

    SearchExperiences: {
        headTitle: 'experience montréal.',
        headDescription: 'Discover unique experiences in Montréal',
        personButtonLabel: 'Person',
        peopleButtonLabel: 'People',
        search: 'Search',
        titlePlaceholder: 'Search experiences'
    },

    ExperienceCard: {
        perConnection: 'per connection',
        perPerson: 'per person',
        online: 'online'
    },

    CategoryBox: {
        taste: 'Taste',
        create: 'Create',
        relax: 'Relax',
        learn: 'Learn',
        move: 'Move'
    },

    Experience: {
        online: 'online',
        duration: 'Duration',
        upTo: 'Up to',
        person: 'Person',
        people: 'People',
        language: 'Language',
        languages: 'Languages',
        ageRestriction: 'Age restriction',
        hostedBy: 'Hosted by',
        aboutCreator: 'About creator',
        planning: 'Planning', 
        included: "What's included", 
        toBring: 'What to bring',
        location: 'Location',
        reviews: 'Reviews from other guests',
        seeAllReviewsButton: 'See all',
        addReviewButton: 'Leave a review'
    },

    AllReviewsDialog: {
        title: 'Reviews from other guests'
    },
    
    ShareExperienceDialog: {
        shareExperience: 'Share this experience',
        copyLink: 'Copy link',
        copyTooltip: 'Copied!'
    },

    RateExperienceDialog: {
        dialogTitle: 'Rate and review this experience',
        textfieldLabel: 'Let future guests know what you liked about this experience.',
        doneButton: 'Done'
    },

    ExperienceDetails: {
        bookExperience: 'Book',
        perConnection: 'per connection',
        perPerson: 'per person'
    },

    BecomeACreator: {
        becomeTitle: 'Become a Creator.',
        shareTitle: 'Share your passion.',
        getPaidTitle: 'Get paid.',
        getStarted: 'Get Started',
        currentCreators1: 'Meet current',
        currentCreators2: 'Creators',
        actTitle1: 'Get your act', 
        actTitle2: 'out there.',
        lightbulbText: 'Find a unique way to share your passion',
        cloudText: 'Bring people into your own world',
        walletText: 'Make money while sharing what really matters to you'
    },

    CreatorForm: {
        headerTitle: 'Before giving life to your experience we would like to get to know you a little bit better.',
        profilePicture: 'Profile picture',
        showSmile: 'Show us your best smile',
        aboutYouTitle: 'About you',
        aboutYouSubtitle: 'Tell us a bit about yourself. How would your friends describe you?',
        aboutYouTip: "Your bio will appear on your experience page. Include fun facts, what you're passionate about, your professional experience and other pertinent information.",
        phoneNumberTitle: "What's your phone number?",
        phoneNumberSubtitle: 'Only us and guests who book your experience will have access to your phone number.',
        idTitle: 'Government ID',
        idSubtitle: "That just allows us to check if it's really you. By verifying the identity of guests and Creators, we make sure everyone feels safe.",
        idTip1: "Your ID won't be shared with anyone else.",
        idTip2: "Please upload an ID with your picture on it, like your driver's license, passport or identity card. We accept .jpg, .jpeg or .png files.",
        front: 'Front',
        back: 'Back',
        frontIdText: 'Show the front of your ID',
        backIdText: 'Add the back of your ID',
        addFront: 'Add front',
        addBack: 'Add back',
        done: 'Done',
        formSubmittedMessage: 'Your form was submitted. All you have left to do is choose the way you want to receive your payments.',
        stripeMessage: 'In order to keep your information secure, all payments are handled and processed by Stripe.'
    },

    StripeRedirect: {
        continueWithStripe: 'Continue with Stripe'
    },

    CreateExperience: {
        stripeRedirectMessage1: 'You’re almost there! Before you start creating, we need you to set up your payment information with Stripe.',
        stripeRedirectMessage2: 'If you need help, please let us know!',
        animationTitle1: 'Just like you.',
        animationTitle2: "We're all about creating special moments.",
        leavePageAlert: 'If you leave this page, your changes will be lost.',
        back: 'Back',
        next: 'Next',
        submit: 'Submit my experience',
        setting: 'Setting',
        location: 'Location',
        title: 'Title',
        category: 'Category',
        planning: 'Planning',
        duration: 'Duration',
        language: 'Language',
        capacity: 'Capacity',
        age: 'Required age',
        preview: 'Preview',
        included: "What's included",
        toBring: 'What to bring',
        price: 'Pricing',
        availabilities: 'Availabilities',
        review: 'Review and submit',
        submittedTitle: 'Your experience was submitted',
        submittedMessage1: 'Your experience',
        submittedMessage2: 'was submitted successfully.',
        submittedMessage3: "We'll review it and get back to you shortly so you can get your act out there as soon as possible.",
        submittedButton: 'Got it'
    },
    
    BuilderSlides_Setting: {
        title: 'Setting',
        subtitle: 'What type of experience are you hosting?',
        online: 'Online',
        onlineOption: 'Host your experience via Zoom',
        inPerson: 'In person',
        inPersonOption: 'Meet your guests in person',
    },

    BuilderSlides_Location: {
        locationTitle: 'Location',
        cityQuestion: 'In which city will your experience take place?',
        meetingPoint: 'Meeting point', 
        meetingPointQuestion: 'Where exactly will you meet your guests?',
        accessTip: 'Choose an easily accessible location.',
        sharedInfoRemark: 'This information will be shared with guests only after booking.',
        zoomPMI: 'ZOOM MEETING PERSONAL ID (PMI)',
        zoomPassword: 'MEETING PASSWORD',
        zoomPMIHelp: 'For help on setting your PMI, check the',
        zoomPasswordHelp: 'For help on managing your password, check the',
        zoomDocs: 'Zoom docs',
    },

    BuilderSlides_Title: {
        title: 'Title',
        subtitle: 'Give your experience a compelling title.',
        tip: 'Try keeping it short and exciting.'
    },

    BuilderSlides_Category: {
        title: 'Category',
        of: 'of',
        question1: 'Which category would you say your experience fits the most?',
        question2: 'Which other category would your experience fit in?',
        tip: 'Add a second category to give a unique touch to your experience.'
    },

    BuilderSlides_Planning: {
        title: 'Planning',
        subtitle: 'Please provide a precise summary of your experience. This description will be displayed on the experience page.',
        textfieldLabel: 'Describe your experience'
    },

    BuilderSlides_Duration: {
        title: 'Duration', 
        subtitle: 'How long is your experience?',
        tip: 'Most experiences are between 1 to 3 hours.',
        hour: 'hour',
        hours: 'hours',
        halfHour: 'and 30 minutes'
    },

    BuilderSlides_Language: {
        title: 'Language',
        subtitle: 'In which language will you interact with your guests?',
        tip: 'You should host your experience in a language you speak fluently.',
        maxLanguagesMessage: 'You can pick a maximum of 3 languages.'
    },

    BuilderSlides_Capacity: {
        title: 'Capacity', 
        subtitle: 'Set a maximum number of guests for your experience.',
        tip: 'Consider the nature of your experience. Some experiences require a certain intimacy and others work better with a bigger group.',
        people: 'People',
        person: 'Person'
    },

    BuilderSlides_AgeRequirements: {
        title: 'Age restriction',
        subtitle: 'Do your guests have to be a certain age to access this experience?',
        tip: 'If your experience includes alcohol or any other age-restricted matter, an age limit must be fixed accordingly.',
        yes: 'Yes',
        no: 'No',
        yearsOld: 'years old'
    },

    BuilderSlides_Preview: {
        title: 'Preview',
        subtitle: "Provide your guests with a teaser of what they'll do.",
        tip: 'Use high quality pictures so that your experience sticks out. Try to include people in the pictures.',
        coverImgTitle: 'Cover Picture',
        coverImgText: 'This picture will appear on the front page of your experience',
        creatorImgTitle: 'Creator',
        creatorImgText: 'Share a picture of you conducting your experience',
        actionImgTitle: 'Action Shot',
        actionImgText: 'Show your guests having a great time',
        locationImgTitle: 'Location',
        locationImgText: 'Include a shot of the surroundings'
    },

    BuilderSlides_IncludedItems: {
        title: "What's included",
        subtitle: 'Please list the items you will provide your guests for this experience.',
        tip: 'If your guests build or create something they will leave with, list it on here too.',
        fieldLabel: 'I will provide...',
        placeholder: 'E.g.: Paint brushes',
        alreadyIncluded: 'You already included that item!'
    },

    BuilderSlides_ToBringItems: {
        title: 'What to bring',
        subtitle1: 'Should your guests be bringing anything?',
        subtitle2: 'What should your guests bring?',
        tip: 'Be as precise as possible so your guests can prepare appropriately.',
        yes: 'Yes',
        no: 'No',
        fieldLabel: 'My guests need...',
        placeholder: 'E.g.: A canvas',
        alreadyIncluded: 'You already included that item!'
    },

    BuilderSlides_Pricing: {
        title: 'Pricing',
        subtitle1: 'Enter the price each guest should pay.',
        subtitle2: 'Enable private bookings',
        tip1: 'This price will be displayed as "Per person"',
        tip2: 'This is a fixed price private groups have to pay to book the entire experience.',
        tip3: 'This option will be offered to your guests if all spots are available for a time slot.',
        pricePerPerson: 'Price per person',
        currency: 'Currency',
        revenue: 'Projected revenue',
        creatorFee: '- 20% Creator fee',
        privatePriceDescription: 'Charge a special price for people who want to be the only guests at your experience.',
        privatePrice: 'Price for private bookings'
    },

    BuilderSlides_Availabilities: {
        title: 'Availabilities',
        subtitle: 'Pick the days and time slots for which guests can book your experience.',
        tip1: 'Consider your weekly schedule. Set realistic availabilities during which you are sure to be free.',
        tip2: "In your creator dashboard, you'll be able to add time slots for a certain date, or remove them if no bookings have been made yet.",
        timezoneMessage: 'The reference time zone is Eastern Standard Time (EST).',
        today: 'Today',
        month: 'Month',
        day: 'Day'
    },

    BuilderSlides_Review: {
        title: 'Review & Submit'
    },

    BookExperience_Layout: {
        dateAndTime: 'Date & Time',
        completeBooking: 'Complete booking',
        payment: 'Payment',
        next: 'Next',
        confirmPayment: 'Confirm payment'
    },

    BookExperience_DateSlide: {
        title: 'Please select a date',
        timezoneMessage: "The reference time zone is Eastern Standard Time (EST)."
    },

    BookExperience_TimeslotSlide: {
        title: 'What time of the day would suit you best?',
        join: 'Join',
        guest: 'guest',
        guests: 'guests',
        firstBooking: 'Be the first to book',
        bookingUnavailable: 'Booking unavailable'
    },

    BookExperience_BookingTypeSlide: {
        title: 'Booking options',
        privateBookingTitle: 'Book entire experience',
        privateBookingSubtitle: 'Be the only guest(s) at this experience',
        publicBookingTitle: 'Book per person',
        publicBookingTitleOnline: 'Book per connection',
        publicBookingSubtitle: 'Join other guests',
        upTo: 'Up to',
        join: 'Join',
        person: 'person',
        people: 'people',
        guest: 'guest',
        guests: 'guests',
        numberOfGuests: 'Number of guest(s)'
    },

    BookExperience_PaymentSlide: {
        cardNumberPlaceholder: 'Credit card number',
        expiryDatePlaceholder: 'MM / YY',
        cvcPlaceholder: 'CVC',
        zipCodePlaceholder: 'ZIP code',
        emailPlaceholder: 'Email address',
        emailMessage: "We'll send your receipt to this email address.",
        subtotal: 'Subtotal',
        total: 'Total',
        serviceFee: 'Service fee'
    },

    BookExperience_SubmittedSlide: {
        title: 'Your booking request was sent',
        subtitle1: "We'll let you know as soon as",
        subtitle2: 'approves your request',
        guest: 'guest',
        guests: 'guests',
        host: 'Your host',
        toBringTitle: 'Be sure to bring',
        meetingSpotTitle: 'Meeting spot',
        online: 'Online',
        paymentDetails: 'Payment details',
        paymentMethod: 'Payment method',
        total: 'Total',
        buttonText: 'Got it'
    },

    CreatorDashboard_Layout: {
        dashboardTitle: 'My dashboard',
        bookingRequests: 'Booking requests',
        calendar: 'Calendar',
        createdExperiences: 'My experiences'
    },

    NoExperiencesCard: {
        message: 'Go ahead and create your own experience.',
        button: 'Get started'
    },

    BookingRequests: {
        decisionError: "We couldn't process your decision...",
        bookingAcceptedMessage: 'The booking was accepted.',
        bookingRejectedMessage: 'The booking was canceled.'
    },

    BookingCard: {
        fromTitle: 'Booking request from',
        guest: 'guest',
        guests: 'guests',
        currentlyFor: 'Currently for',
        accept: 'Accept',
        decline: 'Decline',
        currentPayment: 'Current payment',
        privateBooking: 'Private booking'
    },

    Profile_Layout: {
        experiences: 'Experiences',
        personalInformation: 'Personal infos'
    },

    Profile_Experiences: {
        booked: 'Booked',
        saved: 'Saved'
    },

    Profile_PersonalInformation: {
        firstName: 'First name',
        lastName: 'Last name',
        liveIn: 'I live in',
        email: 'Email',
        phoneNumber: 'Phone number',
        birthday: 'Birthday',
        aboutYou: 'About you',
        submitButton: 'Save changes'
    },

    CreatorCalendar: {
        timezoneMessage: 'The reference time zone is Eastern Standard Time (EST).',
        formTitle: 'Add availabilities',
        formDescription: 'Pick the date & time to add availabilities',
        dateAndTimeLabel: 'Date and time',
        experienceLabel: 'Experience',
        addSlot: 'Add',
        busySlotMessage: 'You have already set availabilities for this timeslot',
        today: 'Today',
        guest: 'Guest',
        guests: 'Guests',
        closeDialog: 'Close',
        private: 'Private'
    },

    ErrorPage: {
        title: "Well.. That wasn't planned.",
        pageNotFound: "The page you're looking for doesn't seem to exist.",
        genericError: 'We messed up and something wrong happened.',
        goBackButton: 'Go back to home page'
    }
}

export default englishTranslation;