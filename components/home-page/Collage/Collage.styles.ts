import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 100
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 5rem)',
        gridTemplateRows: 'repeat(4, 5rem)',
        gridGap: '0.2rem',

        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(6, 4.5rem)',
            gridTemplateRows: 'repeat(4, 4.5rem)',
        },

        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: 'repeat(6, 15vw)',
            gridTemplateRows: 'repeat(4, 15vw)',
            gridGap: '1vw'
        }
    },

    gridItem: {
        margin: 0,

        '&.grid-item-1': {
            gridColumnStart: 4,
            gridColumnEnd: 5,
            gridRowStart: 2,
            gridRowEnd: 5
        },

        '&.grid-item-2': {
            gridColumnStart: 1,
            gridColumnEnd: 4,
            gridRowStart: 4,
            gridRowEnd: 4
        },

        '&.grid-item-3': {
            gridColumnStart: 1,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 4
        },

        '&.grid-item-4': {
            gridColumnStart: 5,
            gridColumnEnd: 7,
            gridRowStart: 2,
            gridRowEnd: 5
        },

        '&.grid-item-5': {
            gridColumnStart: 4,
            gridColumnEnd: 7,
            gridRowStart: 1,
            gridRowEnd: 2,

            [theme.breakpoints.down('sm')]: { display: 'none' }
        }
    },

    gridImg: {
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '0.6rem',
        position: 'relative',
        overflow: 'hidden'
    },

    titleFigure: {
        display: 'none',

        [theme.breakpoints.down('sm')]: {
            display: 'block',
            margin: 0,
            gridColumnStart: 4,
            gridColumnEnd: 7,
            gridRowStart: 1,
            gridRowEnd: 2
        }
    },

    gridTitle: {
        fontSize: '1.5rem',
        margin: '10px 0 0 10px',
        lineHeight: 1.2,
        fontFamily: 'Questrial, sans-serif',
        '-webkit-text-stroke': '0.5px #FFF',
        '-webkit-text-fill-color': 'transparent',

        [theme.breakpoints.down(450)]: {
            fontSize: '1.3rem',
            margin: '0 0 0 5px'
        },
        [theme.breakpoints.down(380)]: { fontSize: '1.1rem' },
        [theme.breakpoints.down(330)]: { fontSize: '1rem' }
    },

    title: {
        fontSize: '2.5rem',
        marginLeft: 20,
        alignSelf: 'center',
        fontFamily: 'Questrial, sans-serif',
        '-webkit-text-stroke': '0.6px #FFF',
        '-webkit-text-fill-color': 'transparent',
        width: 350,

        [theme.breakpoints.down('sm')]: { display: 'none' }
    },

    montreal: { '-webkit-text-fill-color': '#FFF' }
});

export default styles;