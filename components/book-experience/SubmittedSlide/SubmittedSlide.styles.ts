import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        height: 'calc(100vh - 100px)',
        marginTop: 100,
        width: '100vw',
        backgroundColor: '#000',
        display: 'flex',

        [theme.breakpoints.down('sm')]: { height: 'auto' }
    },

    pageContainer: {
        width: '80vw',
        margin: '0 auto',

        [theme.breakpoints.down('xs')]: { width: '95vw' }
    },

    greyText: {
        color: '#CCCCCE',
        margin: 0,
        fontSize: '1rem'
    },

    sectionTitle: {
        color: '#CCCCCE',
        fontSize: '1.3rem',
        margin: '1.8rem 0 5px'
    },

    whiteText: {
        margin: '0 0 10px',
        fontSize: '1.7rem'
    },

    capitalized: {
        textTransform: 'capitalize',
        display: 'block'
    },

    header: {
        display: 'flex',
        marginTop: 20,
        lineHeight: 1.1,
        height: 'fit-content',

        '& $greyText': { fontSize: '1.25rem' },

        [theme.breakpoints.down('xs')]: {
            '& $whiteText': { fontSize: '1.2rem' },
            '& $greyText': { fontSize: '1rem' }
        }
    },

    headerGradient: {
        backgroundImage: 'linear-gradient(to bottom, #2BB282 0%, #2D73EA 100%)',
        padding: 4,
        borderRadius: '1.5rem',
        marginRight: 10
    },

    summaryContainer: {
        height: 380,
        display: 'flex',
        marginTop: 40,

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            height: 'auto'
        }
    },

    experienceImage: {
        height: '100%',
        width: 'auto',
        minWidth: 280,
        borderRadius: '2rem',
        marginLeft: 18,
        maxWidth: '45%',
        position: 'relative',
        overflow: 'hidden',

        [theme.breakpoints.down('sm')]: {
            height: 300,
            margin: '0 auto 20px',
            maxWidth: '100%'
        }
    },

    bookingContainer: {
        width: '50%',
        margin: '0 5%',

        [theme.breakpoints.down('sm')]: { width: '90%' }
    },

    icon: {
        fontSize: '1.3rem',
        marginRight: 10
    },

    hostInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 240
    },

    itemList: {
        margin: 0,
        paddingLeft: 20
    },

    priceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '95%',
        margin: '1.8rem 0 5px',

        '& $whiteText': {
            fontSize: '1.2rem'
        }
    },

    allCaps: {
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightRegular,
        color: '#CCCCCE',
        margin: '5px 0 10px',
        fontSize: '0.9rem'
    },

    cardBullets: {  
        margin: '0 5px'
    },

    button: {
        minWidth: 78,
        height: 35,
        alignSelf: 'flex-end',

        [theme.breakpoints.down('sm')]: {
            margin: '10px 0 20px'
        }
    }
});

export default styles;