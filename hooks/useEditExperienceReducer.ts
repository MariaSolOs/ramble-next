import { useReducer, useCallback } from 'react';

import { EDIT_STEPS } from 'models/experience-interface';
import type { EditStep, ExperienceForm, Currency } from 'models/experience-interface';
import type { GetEditExperienceQuery } from 'graphql-server/sdk';

interface EditState {
    currentStep: EditStep;
    currentStepIdx: number;
    canContinue: boolean;
    form?: ExperienceForm;
}

const initialState: EditState = {
    currentStep: 'location',
    currentStepIdx: 0,
    canContinue: false
}

type Action = 
| { type: 'GO_TO_NEXT_STEP'; }
| { type: 'GO_TO_PREV_STEP'; }
| { type: 'GO_TO_STEP'; stepIdx: number; }
| { type: 'SET_CAN_CONTINUE'; value: boolean; }
| { type: 'INIT_FORM'; experience: GetEditExperienceQuery['experiencesById'][number]; }

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
                const prevIdx = Math.max(0, state.currentStepIdx - 1);
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
                    form: {
                        isOnlineExperience: action.experience.isOnlineExperience,
                        location: action.experience.location,
                        meetingPoint: action.experience.meetingPoint || '',
                        latitude: action.experience.latitude || 0,
                        longitude: action.experience.longitude || 0,
                        zoomMeetingId: '',
                        zoomMeetingPassword: '',
                        title: action.experience.title,
                        categories: action.experience.categories,
                        planning: action.experience.description,
                        duration: action.experience.duration,
                        languages: action.experience.languages,
                        capacity: action.experience.capacity,
                        isAgeRestricted: Boolean(action.experience.ageRestriction),
                        ageRequired: action.experience.ageRestriction || 18,
                        images: action.experience.images.map(({ src }) => src),
                        included: action.experience.includedItems,
                        toBring: action.experience.toBringItems,
                        pricePerPerson: action.experience.pricePerPerson,
                        privatePrice: action.experience.privatePrice || 0,
                        currency: action.experience.currency as Currency
                    }
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}