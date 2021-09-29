import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    container: {
        width: '70vw',
        margin: '50px auto',
        display: 'flex',
        flexWrap: 'wrap',

        [theme.breakpoints.down('md')]: { width: '80vw' },
        [theme.breakpoints.down('sm')]: { width: '90vw' }
    },

    card: {
        width: '45%',
        maxWidth: 500,
        height: 280,
        margin: '0 0 40px',
        textDecoration: 'none',
        color: '#FFF',

        '&:nth-child(2n)': { 
            marginLeft: '10%',
            [theme.breakpoints.down('xs')]: { marginLeft: 0 }
        },

        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '0 0 30px'
        }
    },

    cardImg: {
        position: 'relative',
        height: '83%',
        borderRadius: '2rem',
        overflow: 'hidden'
    },

    cardTitle: {
        margin: '1rem 0 0',
        fontSize: '1.2rem',
        textIndent: 10,

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    }
});

export default styles;