import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderRadius: '1rem',
            padding: 10,
            maxWidth: 500
        }
    },

    header: {
        display: 'flex',
        padding: '14px 16px 11px'
    },

    title: {
        margin: 'auto',
        textIndent: -22,
        fontSize: '1.2rem',
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.03rem',
        color: '#ECEBE5',

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    content: {
        flexDirection: 'column',

        [theme.breakpoints.down('xs')]: { padding: 8 }
    },

    closeIcon: {
        color: '#FFF',
        fontSize: '1.5rem',
        cursor: 'pointer',
        float: 'left',

        [theme.breakpoints.down('xs')]: { fontSize: '1.2rem' }
    },

    formControl: {
        display: 'block',
        marginBottom: 15
    },

    smallFormControl: {
        marginBottom: 15,
        width: '49%',

        '&:first-child': { marginRight: '2%' }
    },

    formLabel: {
        color: '#ECEBE5', 
        fontFamily: theme.typography.fontFamily,
        fontSize: '0.85rem',
        letterSpacing: '-0.03rem',
        margin: '0 0 5px 3px',

        [theme.breakpoints.down('xs')]: { fontSize: '0.75rem' }
    },

    textField: {
        '& .MuiOutlinedInput-input': {
            [theme.breakpoints.down('xs')]: { padding: 10 }
        }
    },

    formDivisor: {
        width: '30%',
        minWidth: 100,
        padding: '1.5%',
        margin: '0 auto 15px',
        borderBottom: 'solid 1px #4F4F4F'
    },

    submitButton: {
        width: '100%',
        borderRadius: '0.2rem'
    },

    switchDialogsText: {
        fontSize: '0.78rem',
        fontWeight: theme.typography.fontWeightRegular,
        color: '#6F6E6B',
        letterSpacing: '-0.03rem',
        textAlign: 'center'
    },

    switchDialogsLink: {
        color: '#ECEBE5',
        textDecoration: 'underline',
        cursor: 'pointer'
    },

    forgotPasswordLink: {
        color: '#ECEBE5',
        textDecoration: 'underline',
        cursor: 'pointer',
        margin: '0 3px 15px',
        letterSpacing: '-0.05rem',
        fontSize: '0.8rem'
    }
});

export default styles;