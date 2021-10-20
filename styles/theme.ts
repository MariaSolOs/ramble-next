import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background-color: #151515;
                    font-family: Helvetica, sans-serif;
                    font-weight: 600;
                    letter-spacing: -0.05rem;
                    color: #FFF;
                }

                button {
                    font-family: Helvetica, sans-serif;
                    cursor: pointer;
                }
            `
        }
    },

    typography: {
        fontFamily: ['Helvetica', 'sans-serif'].join(', '),
        questrial: {
            fontFamily: 'Questrial, sans-serif'
        }
    }
});

export default theme;