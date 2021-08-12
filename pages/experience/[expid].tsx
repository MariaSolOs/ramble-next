import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getSdk } from 'graphql-server/sdk';
import useSavedExperiences from 'hooks/useSavedExperiences';
import type { ExperienceViewFragment as ExperienceType } from 'graphql-server/sdk';

import Spinner from 'components/Spinner';
import RambleHead from 'components/RambleHead';
import Layout from 'components/experience-page/Layout';
import ShareExperienceDialog from 'components/ShareExperienceDialog';
import Experience from 'components/Experience';

type Props = {
    experience: ExperienceType;
}

const graphQLClient = getGraphQLClient();
const sdk = getSdk(graphQLClient);

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const id = context.params?.expid as string;
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

const ExperienceDetails = (props: Props) => {
    const { isExperienceSaved, handleSavingToggle } = useSavedExperiences();
    const router = useRouter();

    const [openShareDialog, setOpenShareDialog] = useState(false);

    // Wait until experience is loaded
    if (router.isFallback) {
        return <Spinner />;
    }

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
                <ShareExperienceDialog
                shareUrl={shareUrl}
                experienceTitle={props.experience.title}
                open={openShareDialog}
                onClose={() => setOpenShareDialog(false)} />
                <Experience 
                experience={props.experience}
                isExperienceSaved={isExperienceSaved(props.experience._id)}
                onShareClick={() => setOpenShareDialog(true)}
                onHeartClick={() => handleSavingToggle(props.experience._id)} />
            </Layout>
        </>
    );
}

export default ExperienceDetails;