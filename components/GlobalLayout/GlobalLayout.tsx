import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';

import useUiContext from 'context/uiContext';
import theme from 'styles/theme';

import CssBaseline from '@mui/material/CssBaseline';
import Navbar from 'components/Navbar';
const Snackbar = dynamic(() => 
    import('components/Snackbar')
);
const ErrorDialog = dynamic(() => 
    import('components/ErrorDialog')
);
const SignUpDialog = dynamic<{}>(() => 
import('components/AuthDialogs').then(mod => mod.SignUpDialog)
);
const LogInDialog = dynamic<{}>(() => 
    import('components/AuthDialogs').then(mod => mod.LogInDialog)
);
const ForgotPasswordDialog = dynamic(() =>
    import('components/ForgotPasswordDialog')
);

const GlobalLayout: React.FC = (props) => {
    const { uiState } = useUiContext();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {uiState.snackbarMessage && <Snackbar />}
            {uiState.errorMessage && <ErrorDialog />}
            {uiState.showSignUpDialog && <SignUpDialog />}
            {uiState.showLogInDialog && <LogInDialog />}
            {uiState.showForgotPasswordDialog && <ForgotPasswordDialog />}
            {props.children}
        </ThemeProvider>
    );
}

export default GlobalLayout;