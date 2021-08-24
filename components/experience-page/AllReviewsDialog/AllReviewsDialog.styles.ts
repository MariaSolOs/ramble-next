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
        justifyContent: 'space-between',
        marginBottom: 10,

        [theme.breakpoints.down('xs')]: { marginBottom: 0 }
    },

    title: {
        margin: 0,
        fontSize: '1.3rem',
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    closeIcon: {
        color: '#656565',
        cursor: 'pointer',

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    reviewList: {
        padding: 0,
        listStyle: 'none',
        marginBottom: 0
    },

    reviewTitle: {
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    rating: {
        color: '#FFF',
        marginLeft: '1.5rem',

        '& .MuiRating-iconEmpty': { stroke: '#FFF' },

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    reviewText: {
        color: '#C8C8C8',
        fontSize: '0.9rem',
        margin: '5px 0 1rem',

        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    }
});

export default styles;