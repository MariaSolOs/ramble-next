import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    subtitle: { margin: '8px 0' },
    
    autocomplete: {
        marginTop: '1rem',
        '& .MuiInputBase-root': { borderRadius: 4 }
    },

    autocompletePaper: {
        fontSize: '0.85rem',
        maxHeight: 200,
        overflowY: 'scroll',

        [theme.breakpoints.down('xs')]: { 
            maxHeight: 150,
            '& .MuiAutocomplete-listbox': {
                maxHeight: '100%',
                padding: 0
            },
            '& .MuiAutocomplete-option': {
                minHeight: 0,
                padding: '8px 0 6px 10px'
            }
        },
    },

    locationInfoContainer: { 
        marginTop: 50,
        [theme.breakpoints.down('xs')]: { marginTop: 35 }
    },

    tip: { margin: '0 0 10px' },

    sharedInfoRemark: {
        color: '#CDCDCD',
        fontSize: '0.9rem'
    },

    zoomTextfield: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        color: '#FFF',
        backgroundColor: '#2A2A2A',
        width: '100%',
        padding: '10px 15px',
        height: 45,
        borderRadius: '1rem',
        marginBottom: 15,

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' },

        '& .MuiSvgIcon-root': { fill: '#929293' }
    },

    tooltipLink: {
        fontWeight: 'bold',
        color: '#FFF'
    }
});

export default styles;