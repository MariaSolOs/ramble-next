import React from 'react';
import dynamic from 'next/dynamic';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import useUiContext from 'context/uiContext';

import CssBaseline from '@material-ui/core/CssBaseline';
import { LogInDialog } from 'components/AuthDialogs';
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

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#151515',
                    fontFamily: 'Helvetica, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '-0.05rem',
                    color: '#FFF'
                },

                button: {
                    fontFamily: 'Helvetica, sans-serif',
                    cursor: 'pointer',
                    '&:focus': { outline: 'none' }
                }
            }
        }
    },
    typography: {
        fontFamily: ['Helvetica', 'sans-serif'].join(', ')
    }
});

const GlobalLayout: React.FC = (props) => {
    const { uiState } = useUiContext();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {uiState.snackbarMessage && <Snackbar />}
            {uiState.errorMessage && <ErrorDialog />}
            {uiState.showSignUpDialog && <SignUpDialog />}
            <LogInDialog />
            {props.children}
        </ThemeProvider>
    );
}

export default GlobalLayout;