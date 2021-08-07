import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
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

    slide: {
        width: '65vw',
        margin: '100px auto 0',

        [theme.breakpoints.down('xs')]: { width: '90vw' }
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

    creatorCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: '20px auto 0',
        width: '50%',
        height: 250,

        [theme.breakpoints.down('sm')]: { width: '80%' }
    },

    creatorImgContainer: {
        display: 'flex',
        alignItems: 'center'
    },

    creatorImg: {
        borderRadius: '100%',
        height: 150,
        width: 150,
        overflow: 'hidden',
        position: 'relative',

        [theme.breakpoints.down('sm')]: {
            height: 120,
            width: 120
        },

        [theme.breakpoints.down('sm')]: {
            height: 110,
            width: 110
        }
    },

    creatorName: {
        fontSize: '1.5rem',
        color: '#FFF',
        margin: '10px 0 5px 0',

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    creatorBio: {
        fontFamily: 'Futura, Nunito Sans',
        fontWeight: theme.typography.fontWeightRegular,
        color: '#CCCCC6',
        fontSize: '1rem',
        margin: 0,
        lineHeight: 1.4,

        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    },

    bioArrow: {
        color: '#808080',
        fontSize: '3rem',
        transition: 'ease-in-out 300ms',
        '&:hover': {    
            color: '#FFF',
            cursor: 'pointer'
        }
    },

    zoomEnter: { opacity: 0 },

    zoomEnterActive: { 
        opacity: 1,
        transition: 'all 400ms ease-in'
    },

    zoomExit: { display: 'none' },
});

export default styles;