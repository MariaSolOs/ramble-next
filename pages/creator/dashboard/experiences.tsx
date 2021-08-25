import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useUiContext from 'context/uiContext';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import DashboardLayout from 'components/creator-dashboard/DashboardLayout';
import NoExperiencesCard from 'components/creator-dashboard/NoExperiencesCard';
import CreatedExperiences from 'components/creator-dashboard/CreatedExperiences';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const CreatedExperiencesPage: Page = () => {
    const { uiDispatch } = useUiContext();
    const [session, loading] = useSession();
    const router = useRouter();

    // Make sure user is logged in and a creator
    useEffect(() => {
        if (!loading && (!session || !session.user.creatorId)) {
            router.replace('/');
            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
        }
    }, [session, loading, router, uiDispatch]);

    // Get created experiences
    const { data } = sdk.useGetExperiences(session?.user.creatorId ? 'getExperiences' : null, {
        creatorId: session?.user.creatorId || ''
    });

    if (!data) {
        return <Spinner />;
    }

    if (data.experiences.length === 0) {
        return (
            <NoExperiencesCard 
            creatorName={session!.user.firstName} 
            creatorPhoto={session!.user.photo} />
        );
    } else {
        return <CreatedExperiences experiences={data.experiences} />;
    }

}

CreatedExperiencesPage.displayName = 'CreatedExperiencesPage';
CreatedExperiencesPage.layout = DashboardLayout;

export default CreatedExperiencesPage;