import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    container: {
        margin: '100px auto 0',
        width: '80vw',

        [theme.breakpoints.down('sm')]: { width: '90vw' },  
        [theme.breakpoints.down('xs')]: { margin: '80px auto 0' }
    },

    mainRow: {
        display: 'flex',

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',

            '& $autocomplete, & $collapsibleRow': {
                minWidth: '90vw',
                maxWidth: '100vw',
                marginTop: 10
            }
        }
    },

    capacityInput: { 
        width: 180,
        marginRight: '1.5rem',

        [theme.breakpoints.down('sm')]: { marginRight: 8 }
    },

    autocomplete: {
        width: '30%',
        maxWidth: 340,
        minWidth: 280,
        marginRight: '1.5rem',

        [theme.breakpoints.down('sm')]: { marginRight: 8 }
    },

    searchButton: { width: 90 },

    collapsibleRow: {
        display: 'flex',

        [theme.breakpoints.down('xs')]: {
            '& $capacityInput': {
                width: 'calc(65% - 10px)',
                marginRight: 10
            },

            '& $searchButton': { width: '35%' }
        }
    },

    titleSearchbar: {
        fontSize: '1rem',
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.05rem',
        color: '#929293',
        padding: '10px 8px',
        height: 45,
        marginTop: 10
    }
});

export default styles;