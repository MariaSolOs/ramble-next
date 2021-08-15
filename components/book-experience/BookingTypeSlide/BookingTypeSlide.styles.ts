import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    title: {
        fontSize: '1.5rem',
        margin: '0 0 1rem',

        [theme.breakpoints.down('xs')]: { fontSize: '1.3rem' }
    },

    bookingButton: {
        color: '#ECEBE5',
        backgroundColor: '#2A2A2A',
        border: 'none',
        fontWeight: theme.typography.fontWeightBold,
        padding: '1rem',
        boxSizing: 'border-box',
        borderRadius: 14,
        transition: 'all 300ms ease-in-out',
        width: '100%',
        letterSpacing: '-0.05rem',
        marginBottom: 20,

        '&:hover': {
            '& $buttonTitle, & $buttonText': {
                color: '#2B2B2B',
            },
            backgroundColor: '#ECEBE5'
        }
    },

    selectedButton: {
        '& $buttonTitle, & $buttonText': {
            color: '#2B2B2B',
        },
        backgroundColor: '#ECEBE5'
    },

    icon: {
        marginRight: 8,
        fontSize: 14
    },

    buttonTitle: {
        color: '#FFF',
        margin: 0,
        textAlign: 'left',
        fontSize: '1.2rem',
        display: 'flex',

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    buttonText: {
        color: '#CBCBCB',
        margin: '8px 0 0',
        textAlign: 'left',
        fontSize: '0.95rem',

        '&:nth-of-type(3)': { fontSize: '0.8rem' },

        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    },

    price: { marginLeft: 'auto' },

    numGuestsTitle: {
        textTransform: 'uppercase',
        color: '#CBCBCB'
    },

    numGuestsField: {
        width: '50%',
        minWidth: 210
    }
});

export default styles;