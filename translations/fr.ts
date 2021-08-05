import type { TranslationRecord } from 'models/translation';

const frenchTranslation: TranslationRecord = {
    Home: {
        experienceTitle: "vivez montréal", 
        discoverTitle: 'Découvrez des expériences uniques à Montréal',
        seeAllButton: 'Tout voir',
        partakeTitle: 'Vivez des moments inoubliables',
        partakeSubtitle: 'Les expériences sont des activités uniques organisées par des Créateurs passionnés qui veulent partager leur expertise en donnant à leurs invités un accès privilégié à leur univers.',
        adventureTitle: "En famille, entre amis, seul ou en compagnie d'une personne bien spéciale.",
        adventureSubtitle: 'Faites de chaque occasion une aventure mémorable.'
    },

    Navbar: {
        languageChip: 'EN',
        signUp: "M'inscrire",
        logIn: 'Connexion',
        becomeCreator: 'Devenir un Créateur',
        creatorDashboard: 'Tableau de bord'
    },

    NavbarProfileMenu: {
        profile: 'Profil',
        newExperience: 'Nouvelle expérience',
        languageChip: 'English',
        logout: 'Déconnexion'
    },

    Footer: {
        supportColumnName: 'Support',
        supportLink: 'Support 24/7',
        socialColumnName: 'Réseaux sociaux',
        languageColumnName: 'Langue',
        languageChip: 'English',
        copyright: 'Technologies Ramble Inc'
    },

    CustomerServiceDialog: {
        title: 'Service à la clientèle',
        message: "Service 24/7 pour vous aider n'importe où, n'importe quand"
    },

    SignUpDialog: {
        signUp: "M'inscrire",
        logIn: 'Connexion',
        firstName: 'Prénom',
        lastName: 'Nom de famille',
        email: 'Courriel',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        alreadyHaveAccount: 'Vous avez déjà un compte?',
        continue: 'Continuer',
        passwordMismatch: 'Les mots de passe ne correspondent pas.'
    },

    LogInDialog: {
        logIn: 'Connexion',
        email: 'Courriel',
        password: 'Mot de passe',
        forgotPassword: 'Mot de passe oublié'
    },

    ForgotPasswordDialog: {
        enterEmailTitle: 'Entrez votre adresse courriel',
        sendLinkMessage: 'Nous vous enverrons un lien pour que vous puissiez changer votre mot de passe.',
        resetPassword: 'Réinitialiser mon mot de passe',
        emailSent: 'Le courriel est en route!'
    },

    ResetPasswordDialog: {
        newPassword: 'Nouveau mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        resetPassword: 'Réinitialiser le mot de passe',
        passwordMismatch: 'Les mots de passe ne correspondent pas.'
    },

    ErrorDialog: {
        title: 'Désolé!'
    },

    // SearchExperiences_Searchbar: {
    //     personButtonLabel: 'Personne',
    //     peopleButtonLabel: 'Personnes',
    //     search: 'Explorer',
    //     titlePlaceholder: 'Rechercher'
    // },

    // ExperienceCard: {
    //     perConnection: 'par connexion',
    //     perPerson: 'par personne',
    //     online: 'en ligne'
    // },

    // // CategoryBox: {
    // //     taste: 'Goutez',
    // //     create: 'Créez',
    // //     relax: 'Relaxez',
    // //     learn: 'Apprenez',
    // //     move: 'Bougez'
    // // },

    // Experience: {
    //     online: 'en ligne',
    //     duration: 'Durée',
    //     upTo: "Jusqu'à",
    //     person: 'Personne',
    //     people: 'Personnes',
    //     language: 'Langue',
    //     languages: 'Langues',
    //     ageRestriction: 'Âge requis',
    //     hostedBy: 'Animé par',
    //     aboutCreator: 'À propos du Créateur',
    //     planning: 'Ce que vous ferez',
    //     included: 'Ce qui est inclus',
    //     toBring: 'À apporter',
    //     location: 'Localisation'
    // },

    // ShareExperienceDialog: {
    //     shareExperience: 'Partager cette expérience',
    //     copyLink: "Copier l'url"
    // },
    
    // ViewExperience: {
    //     bookExperience: 'Réserver',
    //     perConnection: 'par connexion',
    //     perPerson: 'par personne'
    // },

    // BecomeACreator: {
    //     becomeTitle: 'Devenez un créateur.',
    //     shareTitle: 'Partagez votre passion.',
    //     getPaidTitle: "Faites de l'argent.",
    //     getStarted: 'Débuter',
    //     currentCreators1: 'Rencontrez quelques', 
    //     currentCreators2: 'Créateurs',
    //     actTitle1: 'Partagez votre passion',
    //     actTitle2: 'dès maintenant.',
    //     lightbulbText: 'Trouvez une manière unique de partager votre passion',
    //     cloudText: 'Invitez des gens dans votre univers',
    //     walletText: 'Transmettez ce qui vous passionne, tout en étant payé'
    // },

    // CreatorForm: {
    //     headerTitle: 'Avant de donner vie à votre expérience, nous aimerions vous connaître un peu mieux.',
    //     profilePicture: 'Photo de profil',
    //     showSmile: 'Montrez-nous votre plus beau sourire',
    //     aboutYouTitle: 'À propos de vous',
    //     aboutYouSubtitle: 'Parlez nous un peu de vous. Comment vos amis vous décriraient-ils?',
    //     aboutYouTip: "Incluez des faits amusants, ce qui vous passionne, votre expérience professionnelle et d'autres informations pertinentes.",
    //     phoneNumberTitle: 'Quel est votre numéro de téléphone?',
    //     phoneNumberSubtitle: 'Seuls nous et les invités qui réservent votre expérience auront accès à votre numéro de téléphone.',
    //     phoneNumberError: 'Veuillez indiquer un numéro de téléphone valable', 
    //     idTitle: "Pièce d'identité",
    //     idSubtitle: "Cela nous permet seulement de vérifier qu’il s’agît bien de vous. En vérifiant l'identité des invités et des créateurs, nous nous assurons que tout le monde se sent en sécurité.",
    //     idTip1: "Votre pièce d’identité ne sera partagée avec personne d'autre.",
    //     idTip2: "Veuillez télécharger une pièce d'identité avec votre photo, comme votre permis de conduire, votre passeport ou votre carte d'identité en fichier .jpg, .jpeg ou .png.",
    //     front: 'Recto',
    //     back: 'Verso',
    //     frontIdText: "Montrez le recto de votre pièce d'identité",
    //     backIdText: "Ajoutez le verso de votre pièce d'identité",
    //     addFront: 'Recto',
    //     addBack: 'Verso',
    //     done: 'Terminé'
    // },

    // CreatorForm_StripeMessage: {
    //     formSubmittedMessage: "Votre formulaire a été soumis. Il ne vous reste plus qu'à choisir la manière dont vous souhaitez recevoir vos paiements.",
    //     stripeMessage: 'Afin de protéger vos informations, tous les paiements sont traités par Stripe.',
    //     continueWithStripe: 'Continuer avec Stripe'
    // },

    // StripeRedirect: {
    //     onboardingMessage: 'Vous y êtes presque! Avant de débuter, nous avons besoin que vous configuriez vos informations de paiement avec Stripe.',
    //     help: "Si vous avez besoin d'aide, faites-le nous savoir!",
    //     continueWithStripe: 'Continuer avec Stripe'
    // },

    // CreateExperience: {
    //     animationTitle1: 'Tout comme vous.',
    //     animationTitle2: 'Nous voulons créer de moments inoubliables.',
    //     leavePageAlert: 'Si vous quittez cette page, les changements ne seront pas sauvegardés.'
    // },
    
    // CreateExperience_Submitted: {
    //     title: 'Votre expérience a été soumise',
    //     message1: 'Votre expérience',
    //     message2: 'a été soumise avec succès.',
    //     message3: "Nous la passerons en revue et vous contacterons dès qu'elle est en ligne.",
    //     button: 'Parfait'
    // },
    
    // CreateExperience_Layout: {
    //     back: 'Retour',
    //     next: 'Suivant',
    //     submit: 'Soumettre mon expérience',
    //     setting: 'Environnement',
    //     location: 'Localisation',
    //     title: 'Titre',
    //     category: 'Catégorie',
    //     planning: 'Ce que vous ferez',
    //     duration: 'Durée',
    //     language: 'Langue',
    //     capacity: 'Capacité',
    //     age: 'Âge requis',
    //     preview: 'Aperçu',
    //     included: 'Ce qui est inclus',
    //     toBring: 'Quoi emporter',
    //     price: 'Prix',
    //     availabilities: 'Disponibilités',
    //     review: 'Reviser & soumettre'
    // },

    // BuilderSlides_Setting: {
    //     title: 'Environnement',
    //     subtitle: "Quel genre d'expérience allez vous animer?",
    //     online: 'En ligne',
    //     onlineOption: 'Animez votre expérience à travers Zoom',
    //     inPerson: 'En personne',
    //     inPersonOption: 'Rencontrez vos invités en personne',
    // },

    // BuilderSlides_Location: {
    //     locationTitle: 'Localisation',
    //     cityQuestion: 'Dans quelle ville est-ce que votre expérience aura lieu?',
    //     meetingPoint: 'Point de rencontre',
    //     meetingPointQuestion: 'Où exactement allez-vous rencontrer vos invités?',
    //     accessTip: 'Choisissez un endroit facilement accessible.',
    //     sharedInfoRemark: "Cette information ne sera partagée qu'après la réservation.",
    //     zoomPMI: 'ZOOM NUMÉRO DE RÉUNION',
    //     zoomPassword: 'MOT DE PASSE POUR LA RÉUNION',
    //     zoomPMIHelp: "Pour obtenir de l'aide, consultez les",
    //     zoomPasswordHelp: "Pour obtenir de l'aide, consultez les",
    //     zoomDocs: 'Zoom docs'
    // },

    // BuilderSlides_Title: {
    //     title: 'Titre',
    //     subtitle: 'Donnez un titre attirant à votre expérience.',
    //     tip: 'Optez pour quelque chose de concis et excitant.'
    // },

    // BuilderSlides_Category: {
    //     title: 'Catégorie',
    //     of: 'sur',
    //     question1: 'À quelle catégorie est-ce que votre expérience correspond le mieux?',
    //     question2: 'Quelle autre catégorie correspond à votre expérience?',
    //     tip: 'Ajoutez une deuxième catégorie pour donner une touche unique à votre expérience.'
    // },

    // BuilderSlides_Planning: {
    //     title: 'Ce que vous ferez',
    //     subtitle: "Fournissez un résumé détaillé de votre expérience. Cette description sera affichée sur la page de l'expérience.",
    //     textfieldLabel: 'Décrivez votre expérience'
    // },

    // BuilderSlides_Duration: {
    //     title: 'Durée',
    //     subtitle: 'Quelle est la durée de votre expérience?',
    //     tip: 'La plupart des expériences durent entre 1 à 3 heures.',
    //     hour: 'heure',
    //     hours: 'heures',
    //     halfHour: 'et 30 minutes'
    // },

    // BuilderSlides_Language: {
    //     title: 'Langue',
    //     subtitle: 'Dans quelle langue allez-vous interagir avec vos invités?',
    //     tip: 'Vous devriez animer votre expérience dans une langue que vous maitrisez parfaitement.',
    //     maxLanguagesMessage: "Vous pouvez choisir jusqu'à trois langues."    
    // },

    // BuilderSlides_Capacity: {
    //     title: 'Capacité',
    //     subtitle: 'Établissez un nombre maximal de participants.',
    //     tip: "Considérez la nature de votre expérience. Certaines expériences nécessitent une certaine intimité alors que d'autres fonctionnent mieux avec un plus grand groupe.",
    //     people: 'Personnes',
    //     person: 'Personne'
    // },

    // BuilderSlides_AgeRequirements: {
    //     title: 'Âge requis',
    //     subtitle: 'Vos invités doivent-ils avoir un âge minimal pour participer à votre expérience?',
    //     tip: "Si votre expérience comprend de l'alcool ou tout autre élément soumis à une limite d'âge, un âge limite doit être fixé en conséquence.",
    //     yes: 'Oui',
    //     no: 'Non',
    //     yearsOld: 'ans'
    // },

    // BuilderSlides_Preview: {
    //     title: 'Aperçu',
    //     subtitle: "Offrez à vos invités un aperçu de ce qu'ils vont faire.",
    //     tip: "Utilisez des images de haute qualité pour que votre expérience se démarque. Essayez d'inclure des personnes dans les photos.",
    //     coverImgTitle: 'Photo de couverture',
    //     coverImgText: 'Cette image apparaîtra comme photo de couverture de votre expérience',
    //     creatorImgTitle: 'Créateur',
    //     creatorImgText: "Partagez une photo de vous en train d'animer votre expérience",
    //     actionImgTitle: 'En action',
    //     actionImgText: "Montrez vos invités qui s'amusent",
    //     locationImgTitle: 'Lieu',
    //     locationImgText: 'Incluez une image des environs dans lesquels vous vous trouverez'
    // },

    // BuilderSlides_IncludedItems: {
    //     title: 'Ce qui est inclus',
    //     subtitle: 'Énumérez les items que vous allez fournir à vos invités.',
    //     tip: 'Si vos invités fabriquent ou créent quelque chose avec lequel ils quitteront, indiquez-le également ici.',
    //     fieldLabel: 'Je fournirai...',
    //     placeholder: 'E.g.: Pinceaux',
    //     alreadyIncluded: 'Vous avez déjà inclus cet item!'
    // },

    // BuilderSlides_ToBringItems: {
    //     title: 'Quoi emporter',
    //     subtitle1: 'Vos invités doivent-ils apporter quelque chose?',
    //     subtitle2: "Qu'est-ce que vos invités doivent apporter?",
    //     tip: 'Soyez le plus précis possible pour que vos invités puissent se préparer convenablement.',
    //     yes: 'Oui',
    //     no: 'Non',
    //     fieldLabel: 'Mes invités ont besoin de...',
    //     placeholder: 'E.g.: Une toile',
    //     alreadyIncluded: 'Vous avez déjà inclus cet item!'
    // },

    // BuilderSlides_Pricing: {
    //     title: 'Prix',
    //     subtitle1: 'Entrez le prix que chaque invité devra payer.',
    //     subtitle2: 'Permettre les réservations privées',
    //     tip1: 'Ce prix sera affiché comme "Par Personne"',
    //     tip2: "Il s'agit d'un prix fixe que les groupes privés doivent payer pour réserver l'expérience au complet.",
    //     tip3: 'Cette option sera proposée à vos invités si toutes les places sont disponibles pour une plage horaire.',
    //     pricePerPerson: 'Prix par personne',
    //     currency: 'Devise',
    //     guest: 'invité',
    //     guests: 'invités',
    //     revenue: 'Revenu projeté',
    //     privatePriceDescription: 'Chargez un prix spécial pour les personnes qui souhaitent être les seuls invités à votre expérience.',
    //     privatePrice: 'Prix pour les réservations privées'
    // },

    // BuilderSlides_Availabilities: {
    //     title: 'Disponibilités',
    //     subtitle: 'Choisissez les dates et les plages horaires pour lesquels les invités peuvent réserver votre expérience.',
    //     tip1: "Tenez compte de votre horaire hebdomadaire. Définissez des disponibilités réalistes pendant lesquelles vous êtes sûr d'être libre.",
    //     tip2: "Dans le tableau de bord, vous pourrez ajouter des plages horaires pour une certaine date ou les supprimer si aucune réservation n'a encore été effectuée.",
    //     timezoneMessage: "L'heure affichée correspond à l'heure de Montréal (heure normale de l'Est).",
    //     today: "Aujourd'hui",
    //     month: 'Mois',
    //     day: 'Jour'
    // },

    // BuilderSlides_Review: {
    //     title: 'Reviser & Soumettre'
    // },

    // BookExperience_Layout: {
    //     dateAndTime: 'Date & Heure',
    //     completeBooking: 'Compléter la réservation',
    //     payment: 'Paiement',
    //     next: 'Suivant',
    //     confirmPayment: 'Confirmer le paiement'
    // },

    // BookExperience_DateSlide: {
    //     title: 'Veuillez choisir une date',
    //     timezoneMessage: "L'heure affichée correspond à l'heure de Montréal (heure normale de l'Est)."
    // },

    // BookExperience_TimeslotSlide: {
    //     title: 'Quel moment de la journée vous conviendrait le mieux?',
    //     join: 'Joignez',
    //     guest: 'invité',
    //     guests: 'invités',
    //     firstBooking: 'Soyez les premiers à reserver',
    //     bookingUnavailable: 'Réservation indisponible'
    // },

    // BookExperience_BookingTypeSlide: {
    //     title: 'Options de réservation',
    //     privateBookingTitle: "Réserver l'expérience au complet",
    //     privateBookingSubtitle: 'Soyez les seuls invités lors de cette expérience',
    //     publicBookingTitle: 'Réserver par personne',
    //     publicBookingTitleOnline: 'Réserver par connexion',
    //     publicBookingSubtitle: "Joignez vous à d'autres invités",
    //     upTo: "Jusqu'à",
    //     person: 'personne',
    //     people: 'personnes',
    //     guest: 'invité',
    //     guests: 'invités',
    //     join: 'Joignez',
    //     numberOfGuests: "Nombre d'invités"
    // },

    // BookExperience_PaymentSlide: {
    //     cardNumberPlaceholder: 'Numéro de carte de crédit',
    //     expiryDatePlaceholder: 'MM / AA',
    //     cvcPlaceholder: 'CVC',
    //     zipCodePlaceholder: 'Code postal',
    //     emailPlaceholder: 'Courriel',
    //     emailMessage: 'Nous enverrons votre reçu à cette adresse courriel.',
    //     subtotal: 'Sous-total',
    //     total: 'Total',
    //     serviceFee: 'Frais de service'
    // },

    // BookExperience_Submitted: {
    //     title: 'Votre demande de réservation a été envoyée',
    //     subtitle1: 'Nous vous avertirons dès que',
    //     subtitle2: 'aura accepté votre demande',
    //     guest: 'invité',
    //     guests: 'invités',
    //     host: 'Votre hôte',
    //     toBringTitle: 'Quoi emporter',
    //     meetingSpotTitle: 'Point de rencontre',
    //     online: 'En ligne',
    //     paymentDetails: 'Détails de paiement',
    //     paymentMethod: 'Mode de paiement',
    //     total: 'Total',
    //     buttonText: 'Parfait'
    // },

    // CreatorDashboard_Layout: {
    //     dashboardTitle: 'Mon tableau de bord',
    //     bookingRequests: 'Réservations',
    //     createdExperiences: 'Mes expériences',
    //     calendar: 'Calendrier'
    // },

    // BookingRequests: {
    //     decisionError: "Nous n'avons pas pu traiter votre décision...",
    //     bookingAcceptedMessage: 'La réservation a été acceptée.',
    //     bookingRejectedMessage: 'La réservation a été annulée.'
    // },

    // BookingCard: {
    //     fromTitle: 'Demande de réservation de',
    //     guest: 'invité',
    //     guests: 'invités',
    //     currentlyFor: 'Actuellement pour le',
    //     accept: 'Accepter',
    //     decline: 'Refuser',
    //     currentPayment: 'Revenu actuel',
    //     privateBooking: 'Réservation privée'
    // },

    // UserProfile_Layout: {
    //     experiences: 'Expériences',
    //     personalInformation: 'Infos personnelles'
    // },

    // UserProfile_Experiences: {
    //     booked: 'Réservées',
    //     saved: 'Enregistrées'
    // },

    // UserProfile_PersonalInformation: {
    //     firstName: 'Prénom',
    //     lastName: 'Nom de famille',
    //     liveIn: "J'habite à",
    //     email: 'Courriel',
    //     phoneNumber: 'Numéro de téléphone',
    //     birthday: 'Anniversaire',
    //     aboutYou: 'À propos de vous',
    //     submitButton: 'Enregistrer',
    //     phoneError: 'Veuillez indiquer un numéro de téléphone valable'
    // },

    // CreatorCalendar: {
    //     timezoneMessage: "L'heure affichée correspond à l'heure de Montréal (heure normale de l'Est).",
    //     formTitle: 'Ajouter des disponibilités',
    //     formDescription: "Choisissez la date et l'heure à ajouter",
    //     dateAndTimeLabel: 'Date et heure',
    //     experienceLabel: 'Expérience',
    //     addSlot: 'Ajouter',
    //     busySlotMessage: 'Vous avez déjà des disponibilités pour cette plage horaire',
    //     today: "Aujourd'hui",
    //     guest: 'Invité',
    //     guests: 'Invités',
    //     closeDialog: 'Fermer',
    //     private: 'Privée'
    // }
}

export default frenchTranslation;