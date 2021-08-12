import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: '#161616',
            borderRadius: '1.1rem',
            letterSpacing: '-0.05rem'
        }
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 24px 0',

        [theme.breakpoints.down('xs')]: { padding: '15px 15px 0' }
    },

    title: {
        fontSize: '1.2rem',
        color: '#FFF',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    closeIcon: {
        cursor: 'pointer',
        color: '#CCC'
    },

    content: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

        [theme.breakpoints.down('xs')]: { padding: '8px 15px' }
    },

    button: {
        backgroundColor: '#2A2A2A',
        color: '#CCC', 
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.05rem',
        fontSize: '0.9rem',
        border: 'none',
        width: '48%',
        height: 45,
        margin: '10px 0',
        borderRadius: '0.6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    mediaIcon: { marginRight: 5 },

    shareButton: {
        width: '100%',
        cursor: 'default',
        padding: '0 7px'
    },

    shareLink: {
        maxWidth: 'calc(65% - 14px)',
        overflowX: 'hidden',
        fontWeight: theme.typography.fontWeightRegular,
        whiteSpace: 'nowrap'
    },

    copyButton: {
        border: 'none',
        backgroundColor: '#656565',
        color: '#FFF',
        borderRadius: '0.6rem',
        height: '80%',
        width: '22%',
        margin: '0 0 0 auto',
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.04rem',
        fontSize: '0.85rem',

        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem',
            minWidth: 65
        }
    }
});

export default styles;