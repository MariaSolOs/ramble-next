import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import type { EventInput } from '@fullcalendar/react';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import useExperienceCreationReducer from 'hooks/useExperienceCreationReducer';
import useRouterPrompt from 'hooks/useRouterPrompt';
import useLanguages from 'hooks/useLanguages';
import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import { TIMEZONE_CONFIG } from 'global-constants';
import type {
    StringField,
    BooleanField,
    NumberField,
    ArrayField
} from 'hooks/useExperienceCreationReducer';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import StripeRedirect from 'components/StripeRedirect';
import IntroAnimation from 'components/experience-builder/IntroAnimation';
import CreationLayout from 'components/experience-builder/CreationLayout';
import SubmittedMessage from 'components/experience-builder/SubmittedMessage';
import Setting from 'components/experience-builder/slides/Setting';
import Location from 'components/experience-builder/slides/Location';
import Title from 'components/experience-builder/slides/Title';
import Category from 'components/experience-builder/slides/Category';
import Planning from 'components/experience-builder/slides/Planning';
import Duration from 'components/experience-builder/slides/Duration';
import Language from 'components/experience-builder/slides/Language';
import Capacity from 'components/experience-builder/slides/Capacity';
import AgeRequirements from 'components/experience-builder/slides/AgeRequirements';
import Preview from 'components/experience-builder/slides/Preview';
import IncludedItems from 'components/experience-builder/slides/IncludedItems';
import ToBringItems from 'components/experience-builder/slides/ToBringItems';
import Pricing from 'components/experience-builder/slides/Pricing';
import Availabilities from 'components/experience-builder/slides/Availabilities';
import Review from 'components/experience-builder/slides/Review';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const CreateExperiencePage: Page = () => {
    const { CreateExperience: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const [session, loading] = useSession();
    const router = useRouter();
    const languageList = useLanguages();

    const [state, dispatch] = useExperienceCreationReducer();
    const [animationIn, setAnimationIn] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [createdTitle, setCreatedTitle] = useState('');

    // Show alert message when leaving
    useRouterPrompt(Boolean(session) && !Boolean(createdTitle), text.leavePageAlert);

    const handleStringChange = useCallback((field: StringField, value: string) => {
        dispatch({ type: 'SET_STRING_FIELD', field, value });
    }, [dispatch]);

    const handleBooleanChange = useCallback((field: BooleanField, value: boolean) => {
        dispatch({ type: 'SET_BOOLEAN_FIELD', field, value });
    }, [dispatch]);

    const handleNumberChange = useCallback((field: NumberField, value: number) => {
        dispatch({ type: 'SET_NUMBER_FIELD', field, value });
    }, [dispatch]);

    const handleArrayChange = useCallback((field: ArrayField, value: string[] | EventInput[]) => {
        dispatch({ type: 'SET_ARRAY_FIELD', field, value });
    }, [dispatch]);

    const handleFieldValidity = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    const handleError = () => {
        uiDispatch({
            type: 'OPEN_ERROR_DIALOG',
            message: 'Something went wrong...'
        })
        setTimeout(() => {
            router.push('/');
        }, 4000);
    }

    const handleSubmit = async () => {
        dispatch({ type: 'START_SUBMIT' });
        
        // Upload images to Cloudinary
        const images: string[] = [];
        for (const imgFile of state.form.images) {
            const formData = new FormData();
            formData.append('file', (imgFile as File));
            formData.append('upload_preset', 'RAMBLE-experiences');

            const { secure_url } = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: formData
            }).then(res => res.json());

            images.push(secure_url);
        }
        
        // Add experience to database
        const creationData = await sdk.createExperience({
            title: state.form.title,
            description: state.form.planning,
            images,
            location: state.form.location,
            meetingPoint: state.form.isOnlineExperience ? 
                undefined : state.form.meetingPoint,
            latitude: state.form.isOnlineExperience ? 
                undefined : state.form.latitude,
            longitude: state.form.isOnlineExperience ?
                undefined : state.form.longitude,
            categories: state.form.categories,
            ageRestriction: state.form.isAgeRestricted ? 
                state.form.ageRequired : undefined,
            duration: state.form.duration,
            languages: state.form.languages,
            includedItems: state.form.included,
            toBringItems: state.form.toBring,
            capacity: state.form.capacity,
            zoomPMI: state.form.isOnlineExperience ? 
                state.form.zoomMeetingId : undefined,
            zoomPassword: state.form.isOnlineExperience ?
                state.form.zoomMeetingPassword : undefined,
            pricePerPerson: state.form.pricePerPerson,
            privatePrice: state.form.privatePrice > 0 ?
                state.form.privatePrice : undefined,
            currency: state.form.currency,
            slots: state.form.slots!.map(({ startStr, endStr }) => ({
                start: DateTime.fromISO(startStr, TIMEZONE_CONFIG).toISO(),
                end: DateTime.fromISO(endStr, TIMEZONE_CONFIG).toISO()
            }))
        });

        setCreatedTitle(creationData.createExperience.title);
    }

    const { data: creatorData } = sdk.useGetCreationProfile(session ? 'getCreationProfile' : null, 
        { userId: session?.user.userId || '' },
        { onError: handleError }
    );

    // Use existing locations for location autocomplete
    const { data: locationsData } = sdk.useGetLocations('getLocations', undefined, {
        onError: handleError
    });

    // Make sure the user is logged in
    useEffect(() => {
        if (!session && !loading) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, router, loading, uiDispatch]);

    useEffect(() => {
        // Start animation on mounting
        setAnimationIn(true);

        // After 2 seconds start fade out
        const animationStartTimer = setTimeout(() => {
            setAnimationIn(false);
        }, 2000);
        // After 3 seconds, hide the animation slide
        const animationDoneTimer = setTimeout(() => {
            setAnimationDone(true);
        }, 3000);

        return () => {
            clearTimeout(animationStartTimer);
            clearTimeout(animationDoneTimer);
        }
    }, []);

    // Reset the form when leaving the page
    useEffect(() => {   
        return () => { dispatch({ type: 'END_SUBMIT' }); }
    }, [dispatch]);

    if (!creatorData || !locationsData) {
        return <Spinner />;
    }

    const creatorId = creatorData.me.creator?._id;
    const onboardedWithStripe = creatorData.me.creator?.stripeProfile.onboarded;

    // If creator hasn't completed the Stripe onboarding, let them try again
    if (creatorId && !onboardedWithStripe) {
        return  (
            <StripeRedirect 
            creatorId={creatorId}
            message1={text.stripeRedirectMessage1}
            message2={text.stripeRedirectMessage2} />
        );
    }

    // When done, show Submitted slide
    if (createdTitle) {
        return <SubmittedMessage experienceTitle={createdTitle} />;
    }
    
    const getSlide = () => {
        switch (state.currentStep) {
            case 'setting':
                return (
                    <Setting
                    isOnlineExperience={state.form.isOnlineExperience}
                    onSelectType={val => handleBooleanChange('isOnlineExperience', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'location':
                return (
                    <Location
                    storedLocations={[ ...new Set(locationsData.experiences.map(({ location }) => 
                        location
                    ))]}
                    isOnlineExperience={state.form.isOnlineExperience!}
                    location={state.form.location}
                    meetingPoint={state.form.meetingPoint}
                    zoomPMI={state.form.zoomMeetingId}
                    zoomPassword={state.form.zoomMeetingPassword}
                    onLocationChange={val => handleStringChange('location', val)}
                    onMeetingPointChange={val => handleStringChange('meetingPoint', val)}
                    onZoomPMIChange={val => handleStringChange('zoomMeetingId', val)}
                    onZoomPasswordChange={val => handleStringChange('zoomMeetingPassword', val)}
                    setCoordinates={(lat, long) => {
                        handleNumberChange('latitude', lat);
                        handleNumberChange('longitude', long);
                    }}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'title':
                return (
                    <Title
                    title={state.form.title}
                    onTitleChange={val => handleStringChange('title', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'category':
                return (
                    <Category
                    categories={state.form.categories}
                    onSelectCategory={(value, remove) => {
                        dispatch({
                            type: 'SET_CATEGORY',
                            value,
                            remove
                        });
                    }}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'planning':
                return (
                    <Planning
                    planning={state.form.planning} 
                    onPlanningChange={val => handleStringChange('planning', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'duration':
                return (
                    <Duration
                    duration={state.form.duration}
                    onDurationChange={val => handleNumberChange('duration', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'language':
                return (
                    <Language
                    languageList={languageList}
                    languages={state.form.languages}
                    onLanguagesChange={val => handleArrayChange('languages', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'capacity':
                return (
                    <Capacity
                    capacity={state.form.capacity}
                    onCapacityChange={val => handleNumberChange('capacity', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'age':
                return (
                    <AgeRequirements
                    isAgeRestricted={state.form.isAgeRestricted}
                    ageRequired={state.form.ageRequired}
                    onAgeRestrictionChange={val => handleBooleanChange('isAgeRestricted', val)}
                    onAgeRequiredChange={val => handleNumberChange('ageRequired', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'preview':
                return (
                    <Preview
                    images={state.form.images}
                    onSlideComplete={handleFieldValidity}
                    onImageChange={(index, value) => {
                        dispatch({ type: 'SET_IMAGE_FILE', index, value });
                    }} />
                );
            case 'included':
                return (
                    <IncludedItems
                    items={state.form.included}
                    onItemsChange={val => handleArrayChange('included', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'toBring':
                return (
                    <ToBringItems
                    items={state.form.toBring}
                    onItemsChange={val => handleArrayChange('toBring', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'price':
                return (
                    <Pricing
                    pricePerPerson={state.form.pricePerPerson}
                    privatePrice={state.form.privatePrice}
                    currency={state.form.currency}
                    capacity={state.form.capacity}
                    onPricePerPersonChange={val => handleNumberChange('pricePerPerson', val)}
                    onPrivatePriceChange={val => handleNumberChange('privatePrice', val)}
                    onCurrencyChange={val => handleStringChange('currency', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'availabilities':
                return (
                    <Availabilities
                    slots={state.form.slots!}
                    duration={state.form.duration}
                    onSlotsChange={val => handleArrayChange('slots', val)}
                    onSlideComplete={handleFieldValidity} />
                );
            case 'review':
                return (
                    <Review
                    creatorName={creatorData.me.firstName}
                    creatorPhoto={creatorData.me.photo!}
                    creatorBio={creatorData.me.creator!.bio}
                    form={state.form}
                    onSlideComplete={handleFieldValidity} />
                );
            default: throw Error('Invalid creation step.');
        }
    }

    if (animationDone) {
        return (
            <CreationLayout
            stepsCompleted={state.stepsCompleted} 
            currentStepIdx={state.currentStepIdx}
            currentStep={state.currentStep}
            canContinue={state.canContinue}
            onNavigate={stepIdx => dispatch({ type: 'GO_TO_STEP', stepIdx })}
            onBack={() => dispatch({ type: 'GO_TO_PREV_STEP' })}
            onNext={
                state.currentStep === 'review' ?
                    handleSubmit : () => dispatch({ type: 'GO_TO_NEXT_STEP' })
            }>
                {state.loading && <Spinner />}
                {getSlide()}
            </CreationLayout>
        );
    } else { // Show start animation
        return <IntroAnimation animationIn={animationIn} />;
    }
}

CreateExperiencePage.displayName = 'CreateExperiencePage';

export default CreateExperiencePage;