import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    slide: {
        margin: '100px auto 0',
        boxSizing: 'border-box',
        display: 'flex',
        width: '65vw',
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.breakpoints.down('xs')]: { width: '90vw' },
    },

    title: {
        color: '#E6E6E6',
        letterSpacing: '-0.05rem',
        margin: 0,
        fontSize: '2.3rem',
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('sm')]: { fontSize: '1.7rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    img: {
        width: 380,
        height: 'auto',
        borderRadius: '2rem',
        overflow: 'hidden',

        [theme.breakpoints.down('md')]: { width: 320 },
        [theme.breakpoints.down('sm')]: { 
            width: '50%',
            marginLeft: '2%',
            borderRadius: '0.8rem'
        },
        [theme.breakpoints.down('xs')]: { width: '46%' }
    },

    button: {
        padding: '10px 20px',
        marginTop: '2rem',
        width: 130,
        fontSize: '1.05rem',
        
        [theme.breakpoints.down('xs')]: {
            width: 90,
            fontSize: '0.7rem',
            padding: '0.4rem 0.7rem',
            marginTop: '1.4rem'
        }
    }
});

export default styles;