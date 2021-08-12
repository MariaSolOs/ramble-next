import { useCallback, useReducer } from 'react';

interface CreatorFormState {
    profilePic?: File;
    phoneNumber: string;
    phoneError: boolean;
    bio: string;
    frontId?: File;
    backId?: File;
    uploading: boolean;
    creatorId: string;
}

const initialState: CreatorFormState = {
    phoneNumber: '',
    phoneError: false,
    bio: '',
    uploading: false,
    creatorId: ''
}

export type FileField = 'profilePic' | 'frontId' | 'backId';

export type StringField = 'phoneNumber' | 'bio' | 'creatorId';

type Action = 
| { type: 'SET_FILE_FIELD'; field: FileField; value?: File; }
| { type: 'SET_STRING_FIELD'; field: StringField; value: string; }
| { type: 'SET_PHONE_ERROR'; error: boolean; }
| { type: 'START_UPLOADING'; }

export default function useCreatorFormReducer() {
    const reducer = useCallback((state: CreatorFormState, action: Action): CreatorFormState => {
        switch (action.type) {
            case 'SET_FILE_FIELD':
                return {
                    ...state,
                    [action.field]: action.value
                }
            case 'SET_STRING_FIELD':
                return {
                    ...state,
                    [action.field]: action.value,
                    phoneError: action.field === 'phoneNumber' ? 
                        false : state.phoneError
                }
            case 'SET_PHONE_ERROR':
                return {
                    ...state,
                    phoneError: action.error,
                    uploading: false
                }
            case 'START_UPLOADING':
                return {
                    ...state,
                    uploading: true
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}