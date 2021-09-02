import React, { useEffect, useCallback } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useExperienceSearchReducer from 'hooks/useExperienceSearchReducer';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import type { GetExperiencesQuery } from 'graphql-server/sdk';
import type { SearchState } from 'hooks/useExperienceSearchReducer';
import type { Page } from 'models/application';

import RambleHead from 'components/RambleHead';
import ExperienceGallery from 'components/search-experiences/ExperienceGallery';
/* Import the searchbar dynamically so that we can set the initial
values from the client. */
const Searchbar = dynamic(() => 
    import('components/search-experiences/Searchbar'), { ssr: false }
);

type Props = {
    locationsList: string[];
    initialExperiences: GetExperiencesQuery;
}

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

export const getStaticProps: GetStaticProps<Props> = async () => {
    // Get available locations
    const { experiences: locationsData } = await sdk.getLocations();
    const allLocations = locationsData.map(({ location }) => location);
    const locationsList = [ ...new Set(allLocations) ];

    // Get the initial experiences
    const initialExperiences = await sdk.getExperiences({
        location: 'Montréal, Canada',
        capacity: 2
    });

    return {
        props: {
            locationsList,
            initialExperiences
        },
        revalidate: 30 * 60 // Renew the data every 30 minutes
    }
}

const SearchExperiencesPage: Page<Props> = (props) => {
    const { SearchExperiences: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const router = useRouter();

    // Retrieve query values from URL
    const { location, capacity } = router.query;
    const locationQuery = location as string;
    const capacityQuery = +capacity;

    const initialState: SearchState = {
        location: locationQuery as string || 'Montréal, Canada',
        capacity: +capacityQuery || 2,
        titleFilter: '',
        allExperiences: [],
        filteredExperiences: []
    }
    const [state, dispatch] = useExperienceSearchReducer(initialState);

    // Fetch the queried experiences
    const {
        data: experiencesData,
        error: experiencesError,
        mutate
    } = sdk.useGetExperiences(['getExperiences', locationQuery, capacityQuery], {
        location: locationQuery,
        capacity: capacityQuery
    }, { initialData: props.initialExperiences });

    // To avoid infinite loops, manage capacity with a callback
    const handleCapacityChange = useCallback((capacity: number) => {
        dispatch({ type: 'UPDATE_CAPACITY', capacity });
    }, [dispatch]);

    useEffect(() => {
        if (experiencesData) {
            dispatch({
                type: 'SET_EXPERIENCES',
                location: locationQuery,
                capacity: capacityQuery,
                experiences: experiencesData.experiences
            });
        }
    }, [experiencesData, locationQuery, capacityQuery, dispatch]);

    useEffect(() => {
        /* For a smoother effect, wait until user stops writing before
           updating the gallery. */
        const timeout = setTimeout(() => {
            let filteredExperiences = state.allExperiences;

            if (state.titleFilter.length > 0) {
                filteredExperiences = state.allExperiences.filter(exp => 
                    exp.title.toLowerCase().includes(state.titleFilter.toLowerCase())
                );
            }

            dispatch({ type: 'SET_FILTERED_EXPERIENCES', filteredExperiences });
        }, 500);

        return () => clearTimeout(timeout);
    }, [dispatch, state.titleFilter, state.allExperiences]);

    // When experiences cannot be loaded, show message and go to the homepage
    if (experiencesError) {
        uiDispatch({
            type: 'OPEN_ERROR_DIALOG',
            message: 'We cannot find your experiences right now...'
        });
        setTimeout(() => {
            router.replace('/');
        }, 3000);
    }

    useEffect(() => {
        mutate();
    }, [locationQuery, capacityQuery, mutate]);

    // Use the first image of the first experience in the head
    const headImage = props.initialExperiences.experiences[0].images[0].src;

    return (
        <>
            <RambleHead
            title={`Ramble: ${text.headTitle}`}
            description={text.headDescription}
            imageUrl={headImage} />
            <Searchbar
            location={state.location}
            locationList={props.locationsList}
            capacity={state.capacity}
            titleFilter={state.titleFilter}
            onCapacityChange={handleCapacityChange}
            onLocationChange={location => {
                dispatch({ type: 'UPDATE_LOCATION', location });
            }}
            onTitleFilterChange={titleFilter => {
                dispatch({ type: 'UPDATE_TITLE_FILTER', titleFilter });
            }} />
            <ExperienceGallery experiences={state.filteredExperiences} />
        </>
    );
}

SearchExperiencesPage.displayName = 'SearchExperiencesPage';

export default SearchExperiencesPage;