import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: '#323232',
        marginTop: 44.406,
        height: 'calc(62% - 44.406px)',
        borderRadius: 10,
        overflowY: 'scroll'
    },

    title: {
        margin: 0,
        fontSize: '1.1rem',
        padding: 8,
        zIndex: 5,
        backgroundColor: '#323232',
        position: 'sticky',
        top: 0,
        display: 'flex',
        
        [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    closeDialogButton: {
        background: 'none',
        margin: '0 0 0 auto',
        color: '#ECEBE5',
        border: 'none',
        letterSpacing: '-0.04rem'
    },

    slotContainer: {
        position: 'relative',
        padding: '5px 8px 1rem',
        transition: 'background-color 300ms ease-in-out',
        borderBottom: 'solid 0.5px #404040',

        '&:hover': { backgroundColor: '#4B4B4B' }
    },

    slotTitle: {
        display: 'inline-flex',
        alignItems: 'center',
        margin: '10px 0 0',
        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' },

        '& $slotBullet': {
            width: 15,
            height: 15,
            marginRight: 5
        }
    },

    slotInfo: {
        margin: '0 0 0 20px',
        fontSize: '0.85rem',
        '&:first-child': { margin: 0 },

        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    slotBullet: {
        borderRadius: '50%',
        width: 8,
        height: 8,
        minWidth: 8,
        marginRight: 4
    },

    clientList: {
        listStyle: 'none',
        paddingLeft: 20,
        margin: '8px 0 0',
    },

    clientItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 5
    },

    clientAvatar: { marginRight: 5 },

    privateBooking: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '0.8rem'
    },

    privateIcon: { fontSize: '1rem' },

    deleteSlotButton: {
        cursor: 'pointer',
        position: 'absolute',
        top: 4,
        right: 4,
        fontSize: '1rem'
    },

    disabledDelete: {
        opacity: 0.5,
        cursor: 'not-allowed'
    },

    dialog: {
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            color: 'inherit'
        }
    }
});

export default styles;