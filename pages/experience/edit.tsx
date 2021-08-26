import { useRouter } from 'next/router';

// import useEditExperinceReducer from 'hooks/useEditExperienceReducer';
import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import type { Page } from 'models/application';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const EditExperiencePage: Page = () => {
    const router = useRouter();

    // Retrieve experience ID from query
    const experienceId = router.query.expid as string;

    // Get the experience for editing
    sdk.useGetEditExperience(experienceId ? 'getEditExperience' : null, 
        { id: experienceId }
    );

    // const [state, dispatch] = useEditExperinceReducer();

    return (
        null
    );
}

EditExperiencePage.displayName = 'EditExperiencePage';

export default EditExperiencePage;