import { useCallback, useReducer } from 'react';

interface PageState {
    openShareDialog: boolean;
    openAllReviews: boolean;
    openNewReviewDialog: boolean;
}

const initialState: PageState = {
    openShareDialog: false,
    openAllReviews: false,
    openNewReviewDialog: false
}

type Action = 
| { type: 'TOGGLE_SHARE_DIALOG'; open: boolean; }
| { type: 'TOGGLE_ALL_REVIEWS_DIALOG'; open: boolean; }
| { type: 'TOGGLE_NEW_REVIEW_DIALOG'; open: boolean; }

export default function useExperiencePageReducer() {
    const reducer = useCallback((state: PageState, action: Action): PageState => {
        switch (action.type) {
            case 'TOGGLE_SHARE_DIALOG':
                return {
                    ...state,
                    openShareDialog: action.open,
                    openAllReviews: false,
                    openNewReviewDialog: false
                }
            case 'TOGGLE_ALL_REVIEWS_DIALOG':
                return {
                    ...state,
                    openShareDialog: false,
                    openAllReviews: action.open,
                    openNewReviewDialog: false
                }
            default: return state;
        }
    }, []);

    return useReducer(reducer, initialState);
}