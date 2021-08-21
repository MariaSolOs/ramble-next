import { useCallback, useReducer } from 'react';

interface CreatorFormState {
    profilePic?: File;
    phoneNumber: string;
    bio: string;
    frontId?: File;
    backId?: File;
    uploading: boolean;
    creatorId: string;
}

const initialState: CreatorFormState = {
    phoneNumber: '',
    bio: '',
    uploading: false,
    creatorId: ''
}

export type FileField = 'profilePic' | 'frontId' | 'backId';

export type StringField = 'phoneNumber' | 'bio' | 'creatorId';

type Action = 
| { type: 'SET_FILE_FIELD'; field: FileField; value?: File; }
| { type: 'SET_STRING_FIELD'; field: StringField; value: string; }
| { type: 'START_UPLOADING'; }

export default function useCreatorFormReducer() {
    const reducer = useCallback((state: CreatorFormState, action: Action): CreatorFormState => {
        switch (action.type) {
            case 'SET_FILE_FIELD':
            case 'SET_STRING_FIELD':
                return {
                    ...state,
                    [action.field]: action.value
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