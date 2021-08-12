import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

import { getGraphQLClient } from 'lib/graphql';
import { getSdkWithHooks } from 'graphql-server/sdk';
import useExperienceSearchReducer from 'hooks/useExperienceSearchReducer';
import type { SearchState } from 'hooks/useExperienceSearchReducer';
import useUiContext from 'context/uiContext';

import Searchbar from 'components/search-experiences/Searchbar';
import ExperienceGallery from 'components/search-experiences/ExperienceGallery';

const graphQLClient = getGraphQLClient();
const sdk = getSdkWithHooks(graphQLClient);

const SearchExperiences = () => {
    const { uiDispatch } = useUiContext();
    const router = useRouter();

    // Retrieve query values from URL
    const { location, capacity } = router.query;
    const locationQuery = location as string;
    const capacityQuery = +capacity;

    const initialState: SearchState = {
        locationList: [],
        location: locationQuery as string || '',
        capacity: +capacityQuery || 2,
        titleFilter: '',
        allExperiences: [],
        filteredExperiences: []
    }
    const [state, dispatch] = useExperienceSearchReducer(initialState);

    // Get available locations
    const { 
        data: locationsData, 
        error: locationsError 
    } = sdk.useGetLocations('getLocations');

    // Fetch the queried experiences
    const {
        data: experiencesData,
        error: experiencesError
    } = sdk.useGetExperiences(['getExperiences', locationQuery, capacityQuery], {
        location: locationQuery,
        capacity: capacityQuery
    });

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
        if (locationsData) {
            dispatch({ type: 'SET_LOCATIONS', locationsQuery: locationsData });
        }
    }, [locationsData, dispatch]);

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
    if (locationsError || experiencesError) {
        uiDispatch({
            type: 'OPEN_ERROR_DIALOG',
            message: 'We cannot find your experiences right now...'
        });
        setTimeout(() => {
            router.replace('/');
        }, 3000);
    }

    return (
        <>
            <Searchbar
            location={state.location}
            locationList={state.locationList}
            onLocationChange={location => {
                dispatch({ type: 'UPDATE_LOCATION', location });
            }}
            capacity={state.capacity}
            onCapacityChange={handleCapacityChange}
            titleFilter={state.titleFilter}
            onTitleFilterChange={titleFilter => {
                dispatch({ type: 'UPDATE_TITLE_FILTER', titleFilter });
            }} />
            <ExperienceGallery experiences={state.filteredExperiences} />
        </>
    );
}

export default SearchExperiences;