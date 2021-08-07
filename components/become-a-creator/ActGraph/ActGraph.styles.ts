import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    slide: {
        width: '65vw',
        margin: '100px auto 90px',

        [theme.breakpoints.down('xs')]: { width: '90vw' },
    },

    title: {
        color: '#E6E6E6',
        letterSpacing: '-0.05rem',
        margin: 0,
        fontSize: '2.3rem',
        whiteSpace: 'nowrap',
        display: 'flex',

        [theme.breakpoints.down('sm')]: { fontSize: '1.7rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    underlined: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '0.55rem',

        [theme.breakpoints.down('xs')]: { 
            marginLeft: '0.45rem',
            '& $gradientLine': { 
                padding: 2,
                marginTop: -3
            }
        }
    },

    gradientLine: {
        padding: 3,
        marginTop: -6,
        borderRadius: '1rem',
        background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)'
    },

    graphContainer: {
        position: 'relative',

        '& $gradientLine': {
            width: '75%',
            position: 'absolute',
            top: 33,
            left: '12%',
            zIndex: -1
        }
    },

    graph: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30
    },

    graphItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '25%',
        color: '#808080',
        transition: 'color 300ms ease-in-out',

        '&:hover': { color: '#E6E6E6' },

        [theme.breakpoints.down('xs')]: { width: '30%' }
    },

    graphCircle: {
        backgroundColor: 'whitesmoke',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    graphText: {
        textAlign: 'center',
        fontSize: '1.1rem',
        lineHeight: 1.2,

        [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '0.75rem' }
    }
});

export default styles;