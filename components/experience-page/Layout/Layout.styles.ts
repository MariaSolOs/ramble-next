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
        color: '#BFBFBF',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '-0.03rem',
        margin: '0 auto 0 calc(50% - 85px)',

        [theme.breakpoints.down('xs')]: { 
            fontSize: '0.75rem',
            margin: '0 auto'
        }
    },

    footerPrice: {
        color: '#FFF',
        fontSize: '1.5rem',
        display: 'inline-block',
        margin: '0 3px',

        '&:first-letter': { fontSize: '1rem' },

        [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
    },

    bookingButton: {
        height: 40,
        width: '7rem',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        padding: '0 10px',
        marginRight: 120,

        [theme.breakpoints.down('sm')]: { 
            marginRight: 10,
            fontSize: '0.9rem',
            width: 100
        }
    },

    goBackIcon: {
        fontSize: '1.8rem',
        marginLeft: 10,
        cursor: 'pointer',

        [theme.breakpoints.up('sm')]: { display: 'none' }
    }
});

export default styles;