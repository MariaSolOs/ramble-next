import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import Layout from 'components/profile/Layout';
import UserExperiences from 'components/profile/UserExperiences';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const UserExperiencesPage: Page = () => {
    const { Profile_Experiences: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const [session, loading] = useSession();
    const router = useRouter();

    // Make sure user is logged in
    useEffect(() => {
        if (!session && !loading) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, loading, router, uiDispatch]);

    const { data } = sdk.useGetUserExperiences(
        session ? 'getUserExperiences' : null,
        { userId: session?.user.userId || '' }
    );

    if (!data) {
        return <Spinner />;
    }

    return (
        <Layout
        name={data.me.firstName}
        photo={data.me.photo?.src}
        city={data.me.city || undefined}>
            <UserExperiences title={text.saved} experiences={data.me.savedExperiences} />
            <UserExperiences title={text.booked} experiences={data.me.bookedExperiences} />
        </Layout>
    );
}

UserExperiencesPage.displayName = 'UserExperiencesPage';

export default UserExperiencesPage;