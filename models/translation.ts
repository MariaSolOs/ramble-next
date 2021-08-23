import type { 
    Category as ExperienceCategory,
    CreationStep as ExperienceCreationStep 
} from './experience-interface';

export type Language = 'en' | 'fr';

export type TranslationRecord = {
    Home: Record<'experienceTitle' | 'discoverTitle' | 'seeAllButton' | 'partakeTitle' | 'partakeSubtitle' | 'adventureTitle' | 'adventureSubtitle' | 'onboardingReturnSuccess' | 'onboardingReturnFailure', string>;

    Navbar: Record<'languageChip' | 'signUp' | 'logIn' | 'becomeCreator' | 'creatorDashboard', string>;

    NavbarProfileMenu: Record<'profile' | 'newExperience' | 'languageChip' | 'logout', string>,

    Footer: Record<'supportColumnName' | 'supportLink' | 'socialColumnName' | 'languageColumnName' | 'languageChip' | 'copyright', string>;

    CustomerServiceDialog: Record<'title' | 'message', string>;

    SignUpDialog: Record<'signUp' | 'logIn' | 'firstName' | 'lastName' | 'phoneNumber' | 'email' | 'password' | 'confirmPassword' | 'alreadyHaveAccount' | 'continue' | 'passwordMismatch', string>;

    LogInDialog: Record<'logIn' | 'signUp' | 'email' | 'password' | 'forgotPassword' | 'noAccountYet', string>;

    ForgotPasswordDialog: Record<'enterEmailTitle'| 'sendLinkMessage' | 'resetPassword' | 'emailSent', string>;

    ResetPasswordDialog: Record<'newPassword' | 'confirmPassword' | 'resetPassword' | 'passwordMismatch', string>;

    ErrorDialog: Record<'title', string>;

    SearchExperiences: Record<'headTitle' | 'headDescription' | 'personButtonLabel' | 'peopleButtonLabel' | 'search' | 'titlePlaceholder', string>;

    ExperienceCard: Record<'perConnection' | 'perPerson' | 'online', string>;

    CategoryBox: Record<ExperienceCategory, string>;

    Experience: Record<'online' | 'duration' | 'upTo' | 'person' | 'people' | 'language' | 'languages' | 'ageRestriction' | 'hostedBy' | 'aboutCreator' | 'planning' | 'included' | 'toBring' | 'location' | 'reviews' | 'seeAllReviewsButton' | 'addReviewButton', string>;

    ShareExperienceDialog: Record<'shareExperience' | 'copyLink' | 'copyTooltip', string>;

    AllReviewsDialog: Record<'title', string>;

    RateExperienceDialog: Record<'dialogTitle' | 'textfieldLabel' | 'doneButton', string>;

    ExperienceDetails: Record<'bookExperience' | 'perConnection' | 'perPerson', string>;

    BecomeACreator: Record<'becomeTitle' | 'shareTitle' | 'getPaidTitle' | 'getStarted' | 'currentCreators1' | 'currentCreators2' | 'actTitle1' | 'actTitle2' | 'lightbulbText' | 'cloudText' | 'walletText', string>;

    CreatorForm: Record<'headerTitle' | 'profilePicture' | 'showSmile' | 'aboutYouTitle' | 'aboutYouSubtitle' | 'aboutYouTitle' | 'aboutYouTip' | 'phoneNumberTitle' | 'phoneNumberSubtitle' | 'idTitle' | 'idSubtitle' | 'idTip1' | 'idTip2' | 'front' | 'back' | 'frontIdText' | 'backIdText' | 'addFront' | 'addBack' | 'done' | 'formSubmittedMessage' | 'stripeMessage', string>;

    StripeRedirect: Record<'continueWithStripe', string>;

    CreateExperience: Record<'stripeRedirectMessage1' | 'stripeRedirectMessage2' | 'animationTitle1' | 'animationTitle2' | 'leavePageAlert' | 'back' | 'next' | 'submit' | ExperienceCreationStep | 'submittedTitle' | 'submittedMessage1' | 'submittedMessage2' | 'submittedMessage3' | 'submittedButton', string>;
    
    BuilderSlides_Setting: Record<'title' | 'subtitle' | 'online' | 'onlineOption' | 'inPerson' | 'inPersonOption', string>;
    
    BuilderSlides_Location: Record<'locationTitle' | 'cityQuestion' | 'meetingPoint' | 'meetingPointQuestion' | 'accessTip' | 'sharedInfoRemark' | 'zoomPMI' | 'zoomPassword' | 'zoomPMIHelp' | 'zoomPasswordHelp' | 'zoomDocs', string>;

    BuilderSlides_Title: Record<'title' | 'subtitle' | 'tip', string>;

    BuilderSlides_Category: Record<'title' | 'of' | 'question1' | 'question2' | 'tip', string>;

    BuilderSlides_Planning: Record<'title' | 'subtitle' | 'textfieldLabel', string>;

    BuilderSlides_Duration: Record<'title' | 'subtitle' | 'tip' | 'hour' | 'hours' | 'halfHour', string>;

    BuilderSlides_Language: Record<'title' | 'subtitle' | 'tip' | 'maxLanguagesMessage', string>;
    
    BuilderSlides_Capacity: Record<'title' | 'subtitle' | 'tip' | 'person' | 'people', string>;

    BuilderSlides_AgeRequirements: Record<'title' | 'subtitle' | 'tip' | 'yes' | 'no' | 'yearsOld', string>;
    
    BuilderSlides_Preview: Record<'title' | 'subtitle' | 'tip' | 'coverImgTitle' | 'coverImgText' | 'creatorImgTitle' | 'creatorImgText' | 'actionImgTitle' | 'actionImgText' | 'locationImgTitle' | 'locationImgText', string>;

    BuilderSlides_IncludedItems: Record<'title' | 'subtitle' | 'tip' | 'fieldLabel' | 'placeholder' | 'alreadyIncluded', string>;
    
    BuilderSlides_ToBringItems: Record<'title' | 'subtitle1' | 'subtitle2' | 'tip' | 'yes' | 'no' | 'fieldLabel' | 'placeholder' | 'alreadyIncluded', string>;

    BuilderSlides_Pricing: Record<'title' | 'subtitle1' | 'subtitle2' | 'tip1' | 'tip2' | 'tip3' | 'pricePerPerson' | 'currency' | 'revenue' | 'creatorFee' | 'privatePriceDescription' | 'privatePrice', string>;

    BuilderSlides_Availabilities: Record<'title' | 'subtitle' | 'tip1' | 'tip2' | 'timezoneMessage' | 'today' | 'month' | 'day', string>;

    BuilderSlides_Review: Record<'title', string>;

    BookExperience_Layout: Record<'dateAndTime' | 'completeBooking' | 'payment' | 'next' | 'confirmPayment', string>;

    BookExperience_DateSlide: Record<'title' | 'timezoneMessage', string>;

    BookExperience_TimeslotSlide: Record<'title' | 'join' | 'guest' | 'guests' | 'bookingUnavailable' | 'firstBooking', string>;

    BookExperience_BookingTypeSlide: Record<'title' | 'privateBookingTitle' | 'privateBookingSubtitle' | 'publicBookingTitle' | 'publicBookingTitleOnline' | 'publicBookingSubtitle' | 'upTo' | 'person' | 'people' | 'join' | 'guest' | 'guests' | 'numberOfGuests', string>;

    BookExperience_PaymentSlide: Record<'cardNumberPlaceholder' | 'expiryDatePlaceholder' | 'cvcPlaceholder' | 'zipCodePlaceholder' | 'emailPlaceholder' | 'emailMessage' | 'subtotal' | 'total' | 'serviceFee', string>;

    BookExperience_SubmittedSlide: Record<'title' | 'subtitle1' | 'subtitle2' | 'guest' | 'guests' | 'host' | 'toBringTitle' | 'meetingSpotTitle' | 'online' | 'paymentDetails' | 'paymentMethod' | 'total' | 'buttonText', string>;

    CreatorDashboard_Layout: Record<'dashboardTitle' | 'bookingRequests' | 'calendar' | 'createdExperiences', string>;

    NoExperiencesCard: Record<'message' | 'button', string>;

    BookingRequests: Record<'decisionError' | 'bookingAcceptedMessage' | 'bookingRejectedMessage', string>;

    BookingCard: Record<'fromTitle' | 'guest' | 'guests' | 'currentlyFor' | 'currentPayment' | 'accept' | 'decline' | 'privateBooking', string>;

    Profile_Layout: Record<'experiences' | 'personalInformation', string>;

    Profile_Experiences: Record<'booked' | 'saved', string>;

    Profile_PersonalInformation: Record<'firstName' | 'lastName' | 'liveIn' | 'email' | 'phoneNumber' | 'birthday' | 'aboutYou' | 'submitButton', string>;

    CreatorCalendar: Record<'timezoneMessage' | 'formTitle' | 'formDescription' | 'dateAndTimeLabel' | 'experienceLabel' | 'addSlot' | 'today' | 'busySlotMessage' | 'guest' | 'guests' | 'closeDialog' | 'private', string>;

    ErrorPage: Record<'title' | 'pageNotFound' | 'genericError' | 'goBackButton', string>;
}