import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import useUserExperiences from 'hooks/useUserExperiences';
import useExperiencePageReducer from 'hooks/useExperiencePageReducer';
import type { ExperienceViewFragment as ExperienceType } from 'graphql-server/sdk';
import type { Page } from 'models/application';

import Spinner from 'components/Spinner';
import RambleHead from 'components/RambleHead';
import Layout from 'components/experience-page/Layout';
import Experience from 'components/Experience';
const ShareExperienceDialog = dynamic(() => 
    import('components/ShareDialog')
);
const AllReviewsDialog = dynamic(() => 
    import('components/experience-page/AllReviewsDialog')
);
const NewReviewDialog = dynamic(() => 
    import('components/experience-page/NewReviewDialog')
);

type Props = {
    experience: ExperienceType;
}

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const id = context.params!.expid as string;
    const data = await sdk.getExperiencesById({ ids: [id] });
    const experience = data.experiencesById[0];

    // If experience couldn't be fetched, go to the homepage
    if (!experience) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { experience },
        revalidate: 60 // Changes are reflected after 1 minute
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allData = await sdk.getExperiences();
    // Only pre-generate first 100 experiences
    const experiences = allData.experiences.slice(0, 100);

    return {
        paths: experiences.map(({ _id }) => ({
            params: { expid: _id }
        })),
        fallback: true
    }
}

const ExperienceDetailsPage: Page<Props> = (props) => {
    const { ExperienceDetails: text } = useLanguageContext().appText;
    const { 
        isExperienceSaved, 
        isExperienceBooked, 
        handleSavingToggle 
    } = useUserExperiences();
    const router = useRouter();

    const [state, dispatch] = useExperiencePageReducer();

    // Get the experience's reviews when experience is defined
    const { data: reviewsData } = sdk.useGetReviews(
        router.isFallback ? null : ['getReviews', props.experience._id], 
        { experienceId: props.experience?._id }
    );

    // Check if we're in review mode
    useEffect(() => {
        if (router.query.review) {
            dispatch({ type: 'TOGGLE_NEW_REVIEW_DIALOG', open: true });
        }
    }, [router, dispatch]);

    // Wait until experience is loaded
    if (router.isFallback) {
        return <Spinner />;
    }

    const allowUserReview = isExperienceBooked(props.experience?._id);
    const shareUrl = `${process.env.NEXT_PUBLIC_RAMBLE_URL}${router.asPath}`;

    return (
        <>
            <RambleHead
            title={props.experience.title}
            description={props.experience.description}
            imageUrl={props.experience.images[0].src} />
            <Layout 
            experienceId={props.experience._id}
            experiencePrice={props.experience.pricePerPerson}
            isOnlineExperience={props.experience.isOnlineExperience}>
                {state.openShareDialog && 
                    <ShareExperienceDialog
                    shareUrl={shareUrl}
                    dialogTitle={text.shareExperienceTitle}
                    open={state.openShareDialog}
                    onClose={() => {
                        dispatch({ type: 'TOGGLE_SHARE_DIALOG', open: false });
                    }} />}
                {state.openAllReviews && 
                    <AllReviewsDialog
                    open={state.openAllReviews}
                    reviews={reviewsData?.getReviews || []}
                    onClose={() => {
                        dispatch({ type: 'TOGGLE_ALL_REVIEWS_DIALOG', open: false });
                    }} />}
                {(allowUserReview && state.openNewReviewDialog) && 
                    <NewReviewDialog 
                    experienceId={props.experience._id}
                    open={state.openNewReviewDialog}
                    onClose={() => {
                        dispatch({ type: 'TOGGLE_NEW_REVIEW_DIALOG', open: false })
                    }} />}
                <Experience 
                experience={props.experience}
                isExperienceSaved={isExperienceSaved(props.experience._id)}
                reviews={reviewsData?.getReviews}
                onAddReview={allowUserReview ? () => {
                    dispatch({ type: 'TOGGLE_NEW_REVIEW_DIALOG', open: true });
                } : undefined}
                onShareClick={() => {
                    dispatch({ type: 'TOGGLE_SHARE_DIALOG', open: true });
                }}
                onHeartClick={() => handleSavingToggle(props.experience._id)}
                onSeeAllReviews={() => {
                    dispatch({ type: 'TOGGLE_ALL_REVIEWS_DIALOG', open: true });
                }} />
            </Layout>
        </>
    );
}

ExperienceDetailsPage.displayName = 'ExperienceDetailsPage';

export default ExperienceDetailsPage;