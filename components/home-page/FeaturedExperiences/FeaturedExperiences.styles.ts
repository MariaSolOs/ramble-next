import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    divider: {
        backgroundColor: '#FFF',
        padding: '5px 0',
        width: 150,
        margin: '40px auto',
        borderRadius: '2rem',

        [theme.breakpoints.down('sm')]: { 
            width: 100,
            margin: '30px auto' 
        }
    },

    experienceContainer: {
        margin: '0 auto',
        width: 'calc(4 * 245px)',

        [theme.breakpoints.down('sm')]: { width: 'calc(2 * 245px)' },

        [theme.breakpoints.down('xs')]: { width: '100vw' }
    },

    discoverTitle: {
        margin: '15px 0 15px 12.5px',
        fontSize: '1.5rem',

        [theme.breakpoints.down('xs')]: { fontSize: '1.2rem' }
    },

    experiences: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',

        [theme.breakpoints.down('sm')]: { flexWrap: 'wrap' }
    },

    experienceCard: {
        width: 220,
        height: 275,
        margin: '0 12.5px 0',

        [theme.breakpoints.down('sm')]: { marginTop: 25 },

        [theme.breakpoints.down('xs')]: { 
            width: '47vw',
            margin: '3vw 1.5vw 0'
        }
    },

    searchButton: {
        width: 150,
        height: 40,
        textTransform: 'uppercase',
        display: 'block',
        margin: '50px auto 35px'
    }
});

export default styles;