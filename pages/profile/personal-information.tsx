import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import useUserContext from 'context/userContext';
import useUiContext from 'context/uiContext';
import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import { MAX_CREATOR_BIO_LENGTH } from 'global-constants';
import { ProfileFormField as FormField } from 'models/user-interface';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import Layout from 'components/profile/Layout';
import InfosForm from 'components/profile/InfosForm';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

type Form = Record<FormField, string>;

const initialForm: Form = {
    firstName: '',
    lastName: '',
    city: '',
    email: '',
    phoneNumber: '',
    birthday: '',
    creatorBio: ''
}

const PersonalInformationPage: Page = () => {
    const [session, loading] = useSession();
    const router = useRouter();
    const { uiDispatch } = useUiContext();
    const { editUserUi } = useUserContext();

    // Form management
    const [values, setValues] = useState(initialForm);
    const [photo, setPhoto] = useState<File>();
    const [updatingProfile, setUpdatingProfile] = useState(false);

    // Make sure user is logged in
    useEffect(() => {
        if (!session && !loading) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, loading, router, uiDispatch]);

    const { data, mutate } = sdk.useGetProfileInformation(
        session ? 'getProfileInformation' : null, 
        { userId: session?.user.userId || '' }, {
        onSuccess: ({ me }) => {
            // Fill the form with the existing data
            setValues({
                firstName: me.firstName,
                lastName: me.lastName,
                city: me.city || '',
                email: me.email,
                phoneNumber: me.phoneNumber || '',
                birthday: me.birthday || '',
                creatorBio: me.creator?.bio || ''
            });
        }
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const newValue = event.target.value;

        // Make sure bio isn't too long
        if (fieldName === FormField.CreatorBio && newValue.length > MAX_CREATOR_BIO_LENGTH) {
            return;
        }

        setValues(values => ({ ...values, [fieldName]: newValue }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setUpdatingProfile(true);

        // If the user uploaded a new photo, upload to Cloudinary
        let photoUrl = '';
        if (photo) {
            const photoData = new FormData();
            photoData.append('file', photo);
            photoData.append('upload_preset', 'RAMBLE-users');

            const { secure_url } = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URI!, {
                method: 'POST',
                body: photoData
            }).then(res => res.json());
            photoUrl = secure_url;
        }

        const { creatorBio, ...userValues } = values;
        
        const updatedProfile = await sdk.editProfile({
            ...userValues,
            ...photoUrl && { photo: photoUrl },
            ...isCreator && { creatorBio: values.creatorBio }
        });

        editUserUi({
            isLoggedIn: true,
            isCreator,
            userName: updatedProfile.editUser.firstName,
            userPhoto: updatedProfile.editUser.photo || undefined
        });
        mutate();
        setUpdatingProfile(false);
    }

    if (!data) {
        return <Spinner />;
    }

    const isCreator = Boolean(data?.me.creator?._id);

    return (
        <Layout
        name={data.me.firstName}
        onPhotoChange={setPhoto}
        photo={data.me.photo?.src}
        city={data.me.city || undefined}>
            {updatingProfile && <Spinner />}
            <InfosForm
            values={values}
            isCreator={Boolean(data.me.creator?._id)}
            onChange={handleFormChange}
            onSubmit={handleSubmit} />
        </Layout>
    );
}

PersonalInformationPage.displayName = 'PersonalInformationPage';

export default PersonalInformationPage;