import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import type { StripeElementStyle } from '@stripe/stripe-js';

const styles = (theme: Theme) => createStyles({
    root: {
        width: 370,
        margin: '0 auto',
        maxWidth: '100%'
    },

    dateTitle: {
        fontSize: '1.3rem',
        margin: 0,
        textTransform: 'capitalize',
        display: 'block',

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    timeslotTitle: {
        fontSize: '1.1rem',
        color: '#CBCBCB',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
    },

    divisor: {
        backgroundColor: '#CBCBCB',
        padding: '0.5px 0',
        margin: '1rem auto 0',
        width: 70
    },

    priceBreakdown: {
        margin: '1.5rem 0'
    },

    priceRow: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    priceWhiteText: {
        fontSize: '1rem',
        margin: 0
    },

    priceGreyText: {
        color: '#CBCBCB',
        fontSize: '0.85rem',
        margin: 0
    },

    input: {
        marginTop: '1rem',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        height: 39,
        width: '100%',

        '& ::placeholder': {
            opacity: 1,
            color: '#CBCBCB'
        },

        '&.Mui-error': {
            color: '#D8246E'
        }
    },

    cardInfoRow: {
        display: 'flex',
        justifyContent: 'space-between',

        '& $input': {
            width: '31%'
        }
    },

    emailMessage: {
        margin: '8px 0 0 3px',
        fontSize: '0.8rem',
        color: '#CBCBCB'
    }
});

export const stripeStyles: StripeElementStyle = {
    base: {
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#FFF',
        color: '#2A2A2A',
        fontSize: '16px',
        letterSpacing: '-0.8px',

        '::placeholder': {
            color: '#CBCBCB'
        }
    },

    invalid: {
        color: '#D8246E'
    }
}

export default styles;