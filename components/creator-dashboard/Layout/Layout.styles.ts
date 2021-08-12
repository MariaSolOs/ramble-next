import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: '90px 24px 0',
        boxSizing: 'border-box',
        height: '100%',

        [theme.breakpoints.down('xs')]: { 
            padding: '75px 2.5vw 10px'
        }
    },

    dashboardTitle: {
        fontSize: '1.3rem',
        margin: '0 0 10px',

        [theme.breakpoints.down('xs')]: { fontSize: '1.1rem' }
    },

    navButton: {
        textDecoration: 'none',
        color: '#ECEBE5',
        backgroundColor: '#2A2A2A',
        padding: '0.5rem',
        borderRadius: 8,
        width: 130,
        textAlign: 'center',
        display: 'inline-block',
        fontSize: '0.8rem',
        transition: 'all 300ms ease-in-out',
        whiteSpace: 'nowrap',

        '&:nth-of-type(2)': { margin: '0 1rem' }, 

        [theme.breakpoints.down('xs')]: {
            width: '32%',
            fontSize: '0.7rem',
            '&:nth-of-type(2)': { margin: '0 2%' }, 
        }
    },

    activeButton: {
        color: '#2B2B2B',
        backgroundColor: '#ECEBE5'
    }
});

export default styles;