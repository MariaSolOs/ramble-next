import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        fontFamily: 'Questrial, sans-serif',
        width: '90vw',
        margin: '30vh auto 0',

        [theme.breakpoints.down('xs')]: { marginTop: '20vh' }
    },

    errorCode: {
        fontSize: '3.5rem',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '2.5rem' }
    },

    whiteTitle: {
        fontSize: '2.5rem',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '2rem' }
    },

    greyTitle: {
        fontSize: '2.2rem',
        margin: '0 0 50px',
        color: '#ACACAC',

        [theme.breakpoints.down('xs')]: { fontSize: '1.8rem' }
    },

    button: {
        borderRadius: 10,
        height: 40
    }
});

export default styles;