import { useReducer, useCallback } from 'react';

import { EDIT_STEPS } from 'models/experience-interface';
import type { EditStep, Currency } from 'models/experience-interface';
import type { GetEditExperienceQuery } from 'graphql-server/sdk';

// Form fields that have a string as a value
export type StringField = 
| 'location'
| 'meetingPoint'
| 'planning'
| 'currency';

// Form fields that have a numerical value
export type NumberField = 
| 'latitude'
| 'longitude'
| 'duration' 
| 'ageRequired' 
| 'pricePerPerson'
| 'privatePrice';

// Form fields corresponding to arrays of strings
export type ArrayField = 'languages' | 'included' | 'toBring';

interface EditState {
    currentStep: EditStep;
    currentStepIdx: number;
    canContinue: boolean;
    formDirty: boolean;
    loading: boolean;
    form?: {
        isOnlineExperience: boolean;
        location: string;
        meetingPoint: string;
        latitude: number;
        longitude: number;
        planning: string;
        duration: number; // In hours
        languages: string[];
        isAgeRestricted: boolean;
        ageRequired: number; 
        images: (File | string | undefined)[];
        included: string[];
        toBring: string[];
        capacity: number;
        pricePerPerson: number;
        privatePrice: number;
        currency: Currency;
    }
}

const initialState: EditState = {
    currentStep: 'location',
    currentStepIdx: 0,
    canContinue: false,
    formDirty: false,
    loading: false
}

type Action = 
| { type: 'GO_TO_NEXT_STEP'; }
| { type: 'GO_TO_PREV_STEP'; }
| { type: 'GO_TO_STEP'; stepIdx: number; }
| { type: 'SET_CAN_CONTINUE'; value: boolean; }
| { type: 'INIT_FORM'; experience: GetEditExperienceQuery['experiencesById'][number]; }
| { type: 'SET_STRING_FIELD'; field: StringField; value: string; }
| { type: 'SET_NUMBER_FIELD'; field: NumberField; value: number; }
| { type: 'SET_ARRAY_FIELD'; field: ArrayField; value: string[]; }
| { type: 'SET_AGE_RESTRICTED'; value: boolean; }
| { type: 'SET_IMAGE_FILE'; index: number; value?: File; }
| { type: 'START_SAVING' }
| { type: 'END_SAVING' }

export default function useEditExperinceReducer() {
    const reducer = useCallback((state: EditState, action: Action): EditState => {
        switch (action.type) {
            case 'GO_TO_NEXT_STEP':
                const nextIdx = (state.currentStepIdx + 1) % EDIT_STEPS.length;
                return {
                    ...state,
                    currentStepIdx: nextIdx,
                    currentStep: EDIT_STEPS[nextIdx]
                }
            case 'GO_TO_PREV_STEP':
                let prevIdx = Math.max(0, state.currentStepIdx - 1);
                // Make sure online experiences skip location step
                if (prevIdx === 0 && state.form?.isOnlineExperience) {
                    prevIdx = 1;
                }
                return {
                    ...state,
                    currentStepIdx: prevIdx,
                    currentStep: EDIT_STEPS[prevIdx]
                }
            case 'GO_TO_STEP':
                return {
                    ...state,
                    currentStepIdx: action.stepIdx,
                    currentStep: EDIT_STEPS[action.stepIdx]
                }
            case 'SET_CAN_CONTINUE':
                return {
                    ...state,
                    canContinue: action.value
                }
            case 'INIT_FORM':
                return {
                    ...state,
                    // Online experiences skip the Zoom credentials step
                    currentStep: action.experience.isOnlineExperience ? 'planning' : 'location',
                    form: {
                        isOnlineExperience: action.experience.isOnlineExperience,
                        location: action.experience.location,
                        meetingPoint: action.experience.meetingPoint || '',
                        latitude: action.experience.latitude || 0,
                        longitude: action.experience.longitude || 0,
                        planning: action.experience.description,
                        duration: action.experience.duration,
                        languages: action.experience.languages,
                        isAgeRestricted: Boolean(action.experience.ageRestriction),
                        ageRequired: action.experience.ageRestriction || 18,
                        images: action.experience.images.map(({ src }) => src),
                        included: action.experience.includedItems,
                        toBring: action.experience.toBringItems,
                        capacity: action.experience.capacity,
                        pricePerPerson: action.experience.pricePerPerson,
                        privatePrice: action.experience.privatePrice || 0,
                        currency: action.experience.currency as Currency
                    }
                }
                case 'SET_STRING_FIELD':
                case 'SET_NUMBER_FIELD':
                case 'SET_ARRAY_FIELD':
                    return {
                        ...state,
                        formDirty: true,
                        form: {
                            ...state.form!,
                            [action.field]: action.value
                        }
                    }
                case 'SET_AGE_RESTRICTED':
                    return {
                        ...state,
                        formDirty: true,
                        form: {
                            ...state.form!,
                            isAgeRestricted: action.value
                        }
                    }
                case 'SET_IMAGE_FILE':
                    const images = [ ...state.form!.images ];
                    images[action.index] = action.value;
    
                    return {
                        ...state,
                        formDirty: true,
                        form: {
                            ...state.form!,
                            images
                        }
                    }
                case 'START_SAVING':
                    return {
                        ...state,
                        loading: true
                    }
                case 'END_SAVING':
                    return {
                        ...state,
                        loading: false,
                        formDirty: false
                    }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}