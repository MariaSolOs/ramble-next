import { useReducer, useCallback } from 'react';
import type { EventInput } from '@fullcalendar/react';

import { CREATION_STEPS } from 'models/experience-interface';
import { Currency } from 'graphql-server/sdk';
import type { ExperienceCategory } from 'graphql-server/sdk';
import type { CreationStep, NewExperienceForm } from 'models/experience-interface';

// Form fields that have a string as a value
export type StringField = 
| 'location'
| 'zoomMeetingId'
| 'zoomMeetingPassword'
| 'meetingPoint'
| 'title'
| 'planning'
| 'currency';

// Form fields that have a boolean as a value
export type BooleanField = 'isOnlineExperience' | 'isAgeRestricted';

// Form fields that have a numerical value
export type NumberField = 
| 'latitude'
| 'longitude'
| 'duration' 
| 'capacity' 
| 'ageRequired' 
| 'pricePerPerson'
| 'privatePrice';

// Form fields corresponding to arrays of strings
export type ArrayField = 'languages' | 'included' | 'toBring' | 'slots';

interface CreationState {
    currentStep: CreationStep;
    currentStepIdx: number;
    stepsCompleted: number;
    canContinue: boolean;
    loading: boolean;
    form: NewExperienceForm;
}

const initialState: CreationState = {
    currentStep: 'setting',
    currentStepIdx: 0,
    stepsCompleted: 0,
    canContinue: false,
    loading: false,
    form: {
        location: '',
        meetingPoint: '',
        latitude: 0,
        longitude: 0,
        zoomMeetingId: '',
        zoomMeetingPassword: '',
        title: '',
        categories: [],
        planning: '',
        duration: 2,
        languages: [],
        capacity: 10,
        isAgeRestricted: false,
        ageRequired: 18,
        images: [undefined, undefined, undefined, undefined],
        included: [],
        toBring: [],
        pricePerPerson: 0,
        privatePrice: 0,
        currency: Currency.Cad,
        slots: []
    }
}

type Action = 
| { type: 'GO_TO_NEXT_STEP'; }
| { type: 'GO_TO_PREV_STEP'; }
| { type: 'GO_TO_STEP'; stepIdx: number; }
| { type: 'SET_STRING_FIELD'; field: StringField; value: string; }
| { type: 'SET_BOOLEAN_FIELD'; field: BooleanField; value: boolean; }
| { type: 'SET_NUMBER_FIELD'; field: NumberField; value: number; }
| { type: 'SET_CATEGORY'; value: ExperienceCategory; remove: boolean; }
| { type: 'SET_CATEGORY'; value: ExperienceCategory; remove: boolean; }
| { type: 'SET_IMAGE_FILE'; index: number; value?: File; }
| { type: 'SET_ARRAY_FIELD'; field: ArrayField; value: string[] | EventInput[]; }
| { type: 'SET_CAN_CONTINUE'; value: boolean; }
| { type: 'START_SUBMIT' }
| { type: 'END_SUBMIT' }

export default function useCreateExperienceReducer() {
    const reducer = useCallback((state: CreationState, action: Action): CreationState => {
        switch (action.type) {
            case 'GO_TO_NEXT_STEP':
                const nextIdx = (state.currentStepIdx + 1) % CREATION_STEPS.length;
                return {
                    ...state,
                    currentStepIdx: nextIdx,
                    currentStep: CREATION_STEPS[nextIdx],
                    stepsCompleted: Math.max(state.stepsCompleted, nextIdx)
                }
            case 'GO_TO_PREV_STEP':
                const prevIdx = Math.max(0, state.currentStepIdx - 1);
                return {
                    ...state,
                    currentStepIdx: prevIdx,
                    currentStep: CREATION_STEPS[prevIdx]
                }
            case 'GO_TO_STEP':
                return {
                    ...state,
                    currentStepIdx: action.stepIdx,
                    currentStep: CREATION_STEPS[action.stepIdx]
                }
            case 'SET_STRING_FIELD':
            case 'SET_BOOLEAN_FIELD':
            case 'SET_NUMBER_FIELD':
            case 'SET_ARRAY_FIELD':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        [action.field]: action.value
                    }
                }
            case 'SET_CATEGORY':
                return {
                    ...state,
                    form: {
                        ...state.form,
                        categories: action.remove ? 
                            state.form.categories.filter(categ => categ !== action.value) :
                            state.form.categories.length < 2 ?
                            [ ...state.form.categories, action.value ] :
                            state.form.categories
                    }
                }
            case 'SET_IMAGE_FILE':
                const images = [ ...state.form.images ];
                images[action.index] = action.value;

                return {
                    ...state,
                    form: {
                        ...state.form,
                        images
                    }
                }
            case 'SET_CAN_CONTINUE':
                return {
                    ...state,
                    canContinue: action.value
                }
            case 'START_SUBMIT': 
                return {
                    ...state,
                    loading: true
                }
            case 'END_SUBMIT':
                return {
                    ...initialState
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}