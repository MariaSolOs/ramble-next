import { useCallback, useReducer } from 'react';

import type { CardContentFragment as ExperienceCard } from 'graphql-server/sdk';

export interface SearchState {
    location: string;
    capacity: number;
    titleFilter: string;
    allExperiences: ExperienceCard[];
    filteredExperiences: ExperienceCard[];
}

type Action = 
| { type: 'SET_EXPERIENCES', location: string; capacity: number; experiences: ExperienceCard[]; }
| { type: 'SET_FILTERED_EXPERIENCES', filteredExperiences: ExperienceCard[] }
| { type: 'UPDATE_LOCATION', location: string; }
| { type: 'UPDATE_CAPACITY', capacity: number; }
| { type: 'UPDATE_TITLE_FILTER', titleFilter: string; }

export default function useExperienceSearchReducer(initialState: SearchState) {
    const reducer = useCallback((state: SearchState, action: Action): SearchState => {
        switch (action.type) {
            case 'SET_EXPERIENCES': 
                return {
                    ...state,
                    location: action.location,
                    capacity: action.capacity,
                    allExperiences: action.experiences,
                    filteredExperiences: action.experiences
                }
            case 'SET_FILTERED_EXPERIENCES':
                return {
                    ...state,
                    filteredExperiences: action.filteredExperiences
                }
            case 'UPDATE_LOCATION': 
                return {
                    ...state,
                    location: action.location
                }
            case 'UPDATE_CAPACITY': 
                return {
                    ...state,
                    capacity: action.capacity
                }
            case 'UPDATE_TITLE_FILTER':
                return {
                    ...state,
                    titleFilter: action.titleFilter,
                    filteredExperiences: []
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}
