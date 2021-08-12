import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '60vw',
        margin: '30vh auto 0',
        textAlign: 'center',

        [theme.breakpoints.down('sm')]: {
            width: '80vw',
            margin: '150px auto 0'
        }
    },

    submittedMessage: {
        fontSize: '1.1rem',
        fontWeight: theme.typography.fontWeightRegular
    },

    stripeMessage: { fontSize: '1.2rem' },

    stripeLinkContainer: { 
        marginTop: '2rem',
        cursor: 'pointer'
    },

    stripeContinue: { margin: '0 0 -10px' },

    stripeButton: {
        color: '#4379FF',
        fontSize: '5rem'
    }
});

export default styles;