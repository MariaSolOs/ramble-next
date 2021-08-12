import React, { useEffect, useCallback } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useUiContext from 'context/uiContext';
import useCreatorFormReducer from 'hooks/useCreatorFormReducer';
import type { FileField, StringField } from 'hooks/useCreatorFormReducer';

import Spinner from 'components/Spinner';
import Form from 'components/creator-form/Form';
import StripeMessage from 'components/creator-form/StripeMessage';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const VALID_PHONE_NUMBER_REG = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;

const CreatorForm = () => {
    const [state, dispatch] = useCreatorFormReducer();
    const { uiDispatch } = useUiContext();
    const router = useRouter();
    const [session] = useSession();

    // Make sure only users that are signed in but are not creators are here
    useEffect(() => {
        if (!session || (session.user.creatorId && !state.creatorId)) {
            router.push('/');
        }
    }, [session, state.creatorId, router]);

    // Get the fields to prefill the form
    const { data } = sdk.useGetCreatorFormFields('getCreatorFormFields', {
        userId: session?.user.userId || ''
    });
    
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

            // Check if phone number is valid
            if (!VALID_PHONE_NUMBER_REG.test(state.phoneNumber)) {
                dispatch({ type: 'SET_PHONE_ERROR', error: true });
                return;
            }

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
            if (state.profilePic || isNewPhoneNumber) {
                sdk.updateProfile({
                    ...state.profilePic && { photo: photoUrl },
                    ...isNewPhoneNumber && {
                        phoneNumber: state.phoneNumber.replace(VALID_PHONE_NUMBER_REG, '($1) $2-$3') 
                    }
                });
            }

            // Refresh the UI
            await getSession();
        } catch (err: any) {
            const message = err.message || "We couldn't create your creator profile...";
            uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        }
    }

    if (!data) {
        return <Spinner />;
    }

    // When the form was successfully submitted, start Stripe onboarding
    if (state.creatorId) {
        return <StripeMessage creatorId={state.creatorId} />;
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
            hasPhoneError={state.phoneError}
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

export default CreatorForm;