import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*': {
                    '&:focus-visible': { outline: 'none' }
                },

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

const GlobalStyles: React.FC = (props) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
    </ThemeProvider>
);

export default GlobalStyles;