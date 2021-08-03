import React, { 
    useReducer, 
    useContext, 
    createContext, 
    Dispatch 
} from 'react';

interface UiState {
    showSignUpDialog: boolean;
    showLogInDialog: boolean;
    errorMessage: string;
    snackbarMessage: string;
}

const initialState: UiState = {
    showSignUpDialog: false,
    showLogInDialog: false,
    errorMessage: '',
    snackbarMessage: ''
}

type Action = 
| { type: 'OPEN_SIGN_UP_DIALOG' }
| { type: 'CLOSE_SIGN_UP_DIALOG' }
| { type: 'OPEN_LOG_IN_DIALOG' }
| { type: 'CLOSE_LOG_IN_DIALOG' }
| { type: 'OPEN_ERROR_DIALOG', message: string }
| { type: 'CLOSE_ERROR_DIALOG' }
| { type: 'OPEN_SNACKBAR', message: string }
| { type: 'CLOSE_SNACKBAR' }

const reducer = (state: UiState, action: Action): UiState => {
    switch (action.type) {
        case 'OPEN_SIGN_UP_DIALOG': 
            return {
                ...state,
                showSignUpDialog: true,
                showLogInDialog: false
            }
        case 'CLOSE_SIGN_UP_DIALOG': 
            return {
                ...state,
                showSignUpDialog: false
            }
        case 'OPEN_LOG_IN_DIALOG':
            return {
                ...state,
                showSignUpDialog: false,
                showLogInDialog: true
            }
        case 'CLOSE_LOG_IN_DIALOG': 
            return {
                ...state,
                showLogInDialog: false
            }
        case 'OPEN_ERROR_DIALOG':
            return {
                ...state,
                errorMessage: action.message
            }
        case 'OPEN_SNACKBAR': 
            return {
                ...state,
                snackbarMessage: action.message
            }
        case 'CLOSE_ERROR_DIALOG':
        case 'CLOSE_SNACKBAR': 
            return {
                ...state,
                errorMessage: '',
                snackbarMessage: ''
            }
        default: return state;
    }
}

type UiContextType = {
    uiState: UiState;
    uiDispatch: Dispatch<Action>;
}

const UiContext = createContext<UiContextType>({
    uiState: initialState,
    uiDispatch: () => {}
});

const useUiContext = () => useContext(UiContext);

export const UiProvider: React.FC = (props) => {
    const [uiState, uiDispatch] = useReducer(reducer, initialState);

    // Show server messages
    // TODO: Add this to specific pages
    // useEffect(() => {
    //     const serverMessage = Cookies.get('ramble-server_message');

    //     if (serverMessage) {
    //         Cookies.remove('ramble-server_message');
    //         uiDispatch({ type: 'OPEN_SNACKBAR', message: serverMessage });
    //     }
    // }, []);

    return (
        <UiContext.Provider value={{ uiState, uiDispatch }}>
            {props.children}
        </UiContext.Provider>
    );
}

export default useUiContext;
