import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    title: {
        fontSize: '1.5rem',
        margin: '0 0 10px',

        [theme.breakpoints.down('xs')]: { fontSize: '1.2rem' }
    },

    dateTitle: {
        margin: 0,
        fontSize: '1.3rem',
        textTransform: 'capitalize',

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    yearTitle: {
        color: '#CBCBCB',
        fontSize: '1rem',
        marginLeft: 10,

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    slots: {
        width: '100%',
        minWidth: 340,
        maxHeight: 300,
        overflowY: 'scroll',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '1.5rem 0',

        [theme.breakpoints.down('xs')]: { 
            minWidth: 0,
            maxHeight: 'unset'
        }
    },

    slot: {
        width: '48%',
        height: 90,
        color: '#ECEBE5',
        backgroundColor: '#2A2A2A',
        border: 'none',
        marginBottom: '1.1rem',
        fontWeight: theme.typography.fontWeightBold,
        padding: 14,
        boxSizing: 'border-box',
        borderRadius: 14,
        transition: 'all 300ms ease-in-out',

        '&:nth-child(2n)': {
            marginLeft: '4%'
        },

        '&:disabled': {
            filter: 'brightness(70%)',
            cursor: 'not-allowed'
        },

        '&:hover:not(:disabled)': {
            color: '#2B2B2B',
            '& $icon': { color: '#2B2B2B' },
            backgroundColor: '#ECEBE5'
        },

        [theme.breakpoints.down('xs')]: { padding: 8 }
    },

    selectedSlot: {
        color: '#2B2B2B',
        '& $icon': { color: '#2B2B2B' },
        backgroundColor: '#ECEBE5'
    },

    timeSlotText: {
        margin: '0 0 14px',
        textAlign: 'left',
        fontSize: '1.1rem'
    },

    meridiem: {
        fontSize: '0.8rem',
        margin: '0 3px'
    },

    guestsSlotText: {
        textAlign: 'left',
        margin: 0,
        letterSpacing: '-0.05rem',
        fontSize: '0.8rem'
    },

    icon: {
        color: '#CBCBCB',
        marginRight: 8,
        fontSize: '1rem',

        [theme.breakpoints.down('xs')]: {
            fontSize: '0.85rem'
        }
    }
});

export default styles;