import { createStyles, Theme } from '@material-ui/core/styles';

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
            gridColumnEnd: 6,
            gridRowStart: 1,
            gridRowEnd: 2
        }
    },

    gridTitle: {
        fontSize: '1.8rem',
        margin: '0 0 0 20px',
        lineHeight: 1.2,

        [theme.breakpoints.down(450)]: {
            fontSize: '1.6rem',
            margin: '0 0 0 10px'
        },

        [theme.breakpoints.down(380)]: {
            fontSize: '1.35rem',
            margin: '0 0 0 5px'
        }
    },

    title: {
        fontSize: '2.5rem',
        marginLeft: 20,
        alignSelf: 'center',

        [theme.breakpoints.down('sm')]: { display: 'none' }
    },

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