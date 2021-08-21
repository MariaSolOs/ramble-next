import React, { useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import useUserContext from 'context/userContext';
import useCreatorFormReducer from 'hooks/useCreatorFormReducer';
import type { FileField, StringField } from 'hooks/useCreatorFormReducer';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import Form from 'components/creator-form/Form';
import StripeRedirect from 'components/StripeRedirect';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const CreatorFormPage: Page = () => {
    const { CreatorForm: text } = useLanguageContext().appText;
    const [state, dispatch] = useCreatorFormReducer();
    const { uiDispatch } = useUiContext();
    const { editUserUi } = useUserContext();
    const router = useRouter();
    const [session] = useSession();

    // Get the fields to prefill the form
    const { data } = sdk.useGetCreatorFormFields(session ? 'getCreatorFormFields' : null, {
        userId: session?.user.userId || ''
    });

    // Make sure only users that are signed in but are not creators are here
    useEffect(() => {
        if (!session || (session.user.creatorId && !state.creatorId)) {
            router.replace('/');
        }
    }, [session, state.creatorId, router]);

    useEffect(() => {
        dispatch({ 
            type: 'SET_STRING_FIELD',
            field: 'phoneNumber',
            value: data?.me.phoneNumber || ''
        });
    }, [data?.me.phoneNumber, dispatch]);

    const handleFileChange = useCallback((field: FileField, value?: File) => {
        dispatch({ type: 'SET_FILE_FIELD', field, value });
    }, [dispatch]);

    const handleStringChange = useCallback((field: StringField, value: string) => {
        dispatch({ type: 'SET_STRING_FIELD', field, value });
    }, [dispatch]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            dispatch({ type: 'START_UPLOADING' });

            let photoUrl = '';
            const governmentIds: string[] = [];

            // Upload profile picture if the user didn't have one
            if (data && !data.me!.photo) {
                const photoData = new FormData();
                photoData.append('file', state.profilePic!);
                photoData.append('upload_preset', 'RAMBLE-users');

                const { secure_url } = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URI!, {
                    method: 'POST',
                    body: photoData
                }).then(res => res.json());
                photoUrl = secure_url;
            }

            // Upload IDs
            for (const id of [state.frontId, state.backId]) {
                const idData = new FormData();
                idData.append('file', id!);
                idData.append('upload_preset', 'RAMBLE-creators');
                const { secure_url } = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URI!, {
                    method: 'POST',
                    body: idData
                }).then(res => res.json());
                governmentIds.push(secure_url);
            }

            // Sign up creator
            const creatorData = await sdk.signUpCreator({ 
                bio: state.bio, 
                governmentIds 
            });
            handleStringChange('creatorId', creatorData.signUpCreator._id);

            // Update user information if needed
            const isNewPhoneNumber = data?.me.phoneNumber !== state.phoneNumber;
            let userPhoto = data?.me.photo;
            if (state.profilePic || isNewPhoneNumber) {
                const updatedProfile = await sdk.updateProfile({
                    ...state.profilePic && { photo: photoUrl },
                    ...isNewPhoneNumber && {
                        phoneNumber: state.phoneNumber
                    }
                });
                userPhoto = updatedProfile.editUser.photo;
            }

            // Refresh the user UI
            editUserUi({
                isLoggedIn: true,
                isCreator: true,
                userName: data?.me.firstName,
                userPhoto: userPhoto || undefined
            });
        } catch (err: any) {
            const message = err.message || "We couldn't create your creator profile...";
            uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        }
    }

    if (!data) {
        return <Spinner />;
    }

    // When the form was successfully submitted, start Stripe onboarding
    if (state.creatorId || state.phoneNumber) {
        return (
            <StripeRedirect 
            creatorId={state.creatorId}
            message1={text.formSubmittedMessage} 
            message2={text.stripeMessage} />
        )
    }

    return (
        <>
            {state.uploading && <Spinner />}
            <Form
            creatorName={data.me.firstName}
            showDropzone={!data.me.photo?.src}
            photo={state.profilePic}
            bio={state.bio}
            phoneNumber={state.phoneNumber}
            frontId={state.frontId}
            backId={state.backId}
            submitDisabled={
                (!data.me.photo && !state.profilePic) ||
                (state.bio.length === 0) || 
                (state.phoneNumber.length === 0) || 
                !state.frontId || 
                !state.backId
            }
            onPhotoChange={photo => handleFileChange('profilePic', photo)}
            onBioChange={bio => handleStringChange('bio', bio)}
            onPhoneNumberChange={num => handleStringChange('phoneNumber', num)}
            onFrontIdChange={id => handleFileChange('frontId', id)}
            onBackIdChange={id => handleFileChange('backId', id)}
            onSubmit={handleSubmit} />
        </>
    );
}

CreatorFormPage.displayName = 'CreatorFormPage';

export default CreatorFormPage;