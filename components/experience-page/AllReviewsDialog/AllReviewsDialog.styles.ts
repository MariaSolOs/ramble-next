import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            color: '#FFF',
            borderRadius: '1rem',
            padding: '1.3rem 1.1rem 1.1rem'
        }
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        margin: 0,
        fontSize: '1.25rem',
        whiteSpace: 'nowrap',

        // [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    closeIcon: {
        color: '#656565',
        cursor: 'pointer',

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

});

export default styles;