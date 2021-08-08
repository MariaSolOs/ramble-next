import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    experienceContainer: {
        height: 'calc(100vh - 100px)',
        marginTop: 100,
        width: '100vw',
        padding: '0 6vw',
        backgroundColor: '#000',
        display: 'flex',

        [theme.breakpoints.down('md')]: { padding: '0 1vw' },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 70,
            height: 'auto'
        }
    },

    footer: {
        position: 'fixed',
        bottom: 0, 
        left: 0, 
        right: 0,
        display: 'flex',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#1C1C1C',
        zIndex: 5,

        [theme.breakpoints.down('xs')]: { height: 60 }
    },

    footerPriceInfo: {
        margin: '0 0 0 calc(50% - 82px)',
        color: '#BFBFBF',
        fontSize: '0.9rem',
        letterSpacing: '-0.03rem',
        textTransform: 'uppercase',

        [theme.breakpoints.down('sm')]: { 
            margin: '0 0 0 10px',
            fontSize: '0.75rem'
        }
    },

    footerPrice: {
        color: '#FFF',
        fontSize: '1.5rem',
        display: 'inline-block',
        margin: '0 3px',

        '&:first-letter': { fontSize: '1rem' },

        [theme.breakpoints.down('sm')]: { fontSize: '1.25rem' }
    },

    bookingButton: {
        height: 40,
        width: '7rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        padding: '0 10px',
        margin: '0 150px 0 auto',

        [theme.breakpoints.down('sm')]: { 
            margin: '0 10px 0 auto',
            fontSize: '0.9rem',
            width: 100
        }
    },

    goBackIcon: {
        fontSize: '1.8rem',
        marginLeft: 10,
        display: 'none',
        cursor: 'pointer',

        [theme.breakpoints.down('sm')]: { display: 'inline-block' }
    }
});

export default styles;