import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import useEditExperinceReducer from 'hooks/useEditExperienceReducer';
import useLanguages from 'hooks/useLanguages';
import useRouterPrompt from 'hooks/useRouterPrompt';
import { isFile } from 'models/files';
import type {
    StringField, 
    NumberField,
    ArrayField
} from 'hooks/useEditExperienceReducer';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import EditingLayout from 'components/experience-builder/EditingLayout';
import Location from 'components/experience-builder/slides/Location';
import Planning from 'components/experience-builder/slides/Planning';
import Duration from 'components/experience-builder/slides/Duration';
import Language from 'components/experience-builder/slides/Language';
import AgeRequirements from 'components/experience-builder/slides/AgeRequirements';
import Preview from 'components/experience-builder/slides/Preview';
import IncludedItems from 'components/experience-builder/slides/IncludedItems';
import ToBringItems from 'components/experience-builder/slides/ToBringItems';
import Pricing from 'components/experience-builder/slides/Pricing';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const EditExperiencePage: Page = () => {
    const { EditExperience: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const [session, loading] = useSession();
    const router = useRouter();
    const languageList = useLanguages();

    // Retrieve experience ID from query
    const experienceId = router.query.expid as string;

    const [state, dispatch] = useEditExperinceReducer();
    const [handlingError, setHandlingError] = useState(false);

    const handleStringChange = useCallback((field: StringField, value: string) => {
        dispatch({ type: 'SET_STRING_FIELD', field, value });
    }, [dispatch]);

    const handleNumberChange = useCallback((field: NumberField, value: number) => {
        dispatch({ type: 'SET_NUMBER_FIELD', field, value });
    }, [dispatch]);

    const handleArrayChange = useCallback((field: ArrayField, value: string[]) => {
        dispatch({ type: 'SET_ARRAY_FIELD', field, value });
    }, [dispatch]);

    const handleFieldValidity = useCallback((value: boolean) => {
        dispatch({ type: 'SET_CAN_CONTINUE', value });
    }, [dispatch]);

    const handleError = (message = 'Something went wrong...') => {
        setHandlingError(true);
        uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        setTimeout(() => {
            router.back();
        }, 4000);
    }

    const handleSave = async () => {
        try {
            // Make sure changes are valid
            if (!state.canContinue) {
                uiDispatch({ type: 'OPEN_SNACKBAR', message: 'Invalid changes!' });
                return;
            }

            dispatch({ type: 'START_SAVING' });
    
            // Upload new images to Cloudinary
            const images: string[] = [];
            for (const img of state.form!.images) {
                if (isFile(img)) {
                    const formData = new FormData();
                    formData.append('file', img);
                    formData.append('upload_preset', 'RAMBLE-experiences');
        
                    const { secure_url } = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URI!, {
                        method: 'POST',
                        body: formData
                    }).then(res => res.json());
        
                    images.push(secure_url);
                } else if (img) { // img is a string, so just push the URL
                    images.push(img);
                } else {
                    handleError('Invalid experience images!');
                    return;
                }
            }

            // Save changes
            await sdk.editExperience({
                _id: experienceId,
                description: state.form?.planning,
                images,
                ...state.form?.isOnlineExperience && {
                    meetingPoint: state.form?.meetingPoint,
                    latitude: state.form.latitude,
                    longitude: state.form.longitude
                },
                ...state.form?.isAgeRestricted && {
                    ageRestriction: state.form.ageRequired
                },
                duration: state.form?.duration,
                languages: state.form?.languages,
                includedItems: state.form?.included,
                toBringItems: state.form?.toBring,
                pricePerPerson: state.form?.pricePerPerson,
                privatePrice: state.form?.privatePrice,
                currency: state.form?.currency
            });
            
            dispatch({ type: 'END_SAVING' });
        } catch (err) {
            handleError("We couldn't save your changes...");
        }
    }

    // Get the experience for editing
    sdk.useGetEditExperience((experienceId && session?.user.creatorId && !state.form) ? 'getEditExperience' : null,
        { id: experienceId },
        { 
            onSuccess: ({ experiencesById }) => {
                dispatch({ 
                    type: 'INIT_FORM', 
                    experience: experiencesById[0]
                });
            },
            onError: () => handleError("We couldn't get your experience...")
        }
    );

    // Show alert message when leaving
    useRouterPrompt(
        (
            Boolean(session?.user.creatorId) && 
            Boolean(state.form) && 
            Boolean(state.formDirty) &&
            !handlingError
        ), 
        text.leavePageAlert
    );

    // Make sure the user is logged in
    useEffect(() => {
        if (!session && !loading) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, router, loading, uiDispatch]);

    const getSlide = () => {
        // Wait until form is initialized
        if (!state.form) { 
            return null; 
        }

        switch (state.currentStep) {
            case 'location':
                return (
                    <Location
                    disableLocation
                    storedLocations={[]}
                    isOnlineExperience={state.form.isOnlineExperience!}
                    location={state.form.location}
                    meetingPoint={state.form.meetingPoint}
                    zoomPMI=""
                    zoomPassword=""
                    onLocationChange={val => handleStringChange('location', val)}
                    onMeetingPointChange={val => handleStringChange('meetingPoint', val)}
                    onZoomPMIChange={() => {}}
                    onZoomPasswordChange={() => {}}
                    setCoordinates={(lat, long) => {
                        handleNumberChange('latitude', lat);
                        handleNumberChange('longitude', long);
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
            case 'age':
                return (
                    <AgeRequirements
                    isAgeRestricted={state.form.isAgeRestricted}
                    ageRequired={state.form.ageRequired}
                    onAgeRestrictionChange={value => {
                        dispatch({ type: 'SET_AGE_RESTRICTED', value });
                    }}
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
            default: throw Error('Invalid creation step.');
        }
    }

    if (!state.form) {
        return <Spinner />;
    }

    return (
        <EditingLayout
        isOnlineExperience={state.form.isOnlineExperience}
        canContinue={state.canContinue}
        currentStep={state.currentStep}
        onNext={() => dispatch({ type: 'GO_TO_NEXT_STEP' })}
        onBack={() => dispatch({ type: 'GO_TO_PREV_STEP' })}
        onSave={handleSave}
        onNavigate={stepIdx => dispatch({ type: 'GO_TO_STEP', stepIdx })}>
            {state.loading && <Spinner />}
            {getSlide()}
        </EditingLayout>
    );
}

EditExperiencePage.displayName = 'EditExperiencePage';

export default EditExperiencePage;