import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    greyCaps: {
        color: '#CDCDCD',
        textTransform: 'uppercase',
        fontSize: '1rem',
        margin: '0 1rem',

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    categoriesContainer: {
        display: 'flex',
        width: 480,
        flexWrap: 'wrap',
        margin: '40px 0 0 -10px',

        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '30px auto 0 1.9vw'
        }
    },

    category: {
        width: 150,
        height: 150,
        margin: '0 0 10px 10px',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(50%)',
            transition: '300ms ease-in-out',
        },

        [theme.breakpoints.down('xs')]: {
            width: '29.45vw',
            height: '29.45vw',
            margin: '0 1.9vw 1.9vw 0'
        }
    },

    categorySelected: { filter: 'brightness(50%)' },

    categoryTitle: {
        fontSize: '1.15rem',
        margin: '5px 0',

        [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
    },

    categoryIcon: {
        width: 30,
        height: 30,

        [theme.breakpoints.down('xs')]: {
            width: 25,
            height: 25
        }
    },

    tip: {
        margin: '5px 0 0',

        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    }
});

export default styles;