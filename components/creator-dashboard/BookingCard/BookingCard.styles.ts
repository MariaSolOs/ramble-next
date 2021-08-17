import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { BookingCardStyleProps } from './index';

const styles = (theme: Theme) => createStyles({
    root: {
        width: 380,
        minWidth: 380,
        height: '100%',
        margin: '0 20px',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0 auto 40px',
            maxWidth: 410,
            minWidth: 0,
            maxHeight: 450
        }
    },

    header: {
        marginBottom: '1rem',
        padding: '0 10px',

        '& $greyText:first-child': {
            textTransform: 'capitalize'
        }
    },

    greyText: {
        color: '#ACACAC',
        fontSize: '0.95rem',
        margin: 0,
        display: 'block'
    },

    bookingTitle: {
        fontSize: '1.15rem',
        margin: 0
    },

    private: {
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '0.8rem',

        '& $icon': { color: '#FFF' }
    },

    body: {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.2rem',
        padding: 15,
        height: 'calc(100% - 68px - 1rem)',
        position: 'relative',

        [theme.breakpoints.down(380)]: {
            height: 'auto'
        }
    },

    clientInfo: {
        display: 'flex',
        alignItems: 'center',

        '& $greyText': {
            fontSize: '0.85rem',
            marginLeft: 8
        }
    },

    clientName: {
        fontSize: '1.1rem',
        margin: (props: BookingCardStyleProps) => 
            props.hasClientCity ? '0 0 -4px 8px' : '0 0 0 8px'
    },

    iconContainer: {
        backgroundColor: '#2D2E2E',
        width: 28, 
        height: 28,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    },
    
    icon: {
        color: '#ACACAC',
        fontSize: '1.1rem'
    },

    infoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    
    infoText: {
        fontSize: '0.8rem',
        margin: 0,
        color: '#FFF',

        [theme.breakpoints.down('xs')]: { fontSize: '0.75rem' }
    },

    largeNum: { 
        fontSize: '1.1rem',
        marginRight: 4,

        [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
    },

    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 0'
    },

    experienceInfo: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    },

    experienceImg: {
        height: 70,
        width: 'auto',
        minWidth: 50,
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
        position: 'relative'
    },

    experienceTitle: {
        margin: 0,
        fontSize: '1.1rem'
    },

    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2.5rem',

        [theme.breakpoints.down(380)]: {
            marginTop: 10
        }
    },

    button: {
        color: '#FFF',
        fontSize: '0.9rem',
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.05rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        width: 80,
        height: 35,
        border: 'none'
    },
    
    acceptButton: {
        backgroundColor: '#08E1AE',
        backgroundImage: 'linear-gradient(to right, #76B852 0%, #8DC26F 51%, #76B852 100%)',
        marginRight: '1rem'
    },

    declineButton: {
        backgroundImage: 'linear-gradient(to right, #E53935 0%, #E35D5B 51%, #E53935 100%)'
    }
});

export default styles;