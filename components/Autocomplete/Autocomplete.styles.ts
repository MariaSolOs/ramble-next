import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    paper: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',

        '& li:hover': {
            color: '#FFF',
            transition: 'all 200ms ease-in-out'
        }
    },

    input: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '2rem',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        letterSpacing: '-0.05rem',
        padding: '8px 15px',

        '&.MuiAutocomplete-inputRoot[class*="MuiInput-root"]': { 
            paddingBottom: 10,
            paddingRight: 15
        },

        '& .MuiAutocomplete-endAdornment': { display: 'none' }
    }
});

export default styles;