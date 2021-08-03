import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderRadius: '1rem',
            padding: 15,
            maxWidth: 500
        },
    },

    closeIcon: {
        color: '#FFF',
        fontSize: '1.5rem',
        cursor: 'pointer',
        float: 'left',

        [theme.breakpoints.down('xs')]: { fontSize: '1.2rem' }
    },

    title: {
        color: '#ECEBE5',
        margin: 0,
        fontSize: '1.1rem'
    },

    message: {
        color: '#C0BFBA',
        margin: '1rem 0',
        fontSize: '0.9rem'
    },

    button: {
        width: '100%',
        borderRadius: '0.2rem',
        marginTop: 15
    },

    emailSentContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.8rem 0'
    },

    planeIcon: {
        fontSize: '2rem',
        marginRight: '1rem',
        color: '#FFF'
    }
});

export default styles;