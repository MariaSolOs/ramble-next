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
                    line-height: 1.43;
                }

                button {
                    font-family: Helvetica, sans-serif;
                    cursor: pointer;
                }
            `
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: '#E0E0E0'
                }
            }
        }
    },

    typography: {
        fontFamily: ['Helvetica', 'sans-serif'].join(', '),
        questrial: {
            fontFamily: 'Questrial, sans-serif'
        },
        futura: {
            fontFamily: 'Futura, Nunito Sans'
        }
    }
});

export default theme;