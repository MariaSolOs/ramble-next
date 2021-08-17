import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    title: {
        color: '#ACACAC',
        fontSize: '1.15rem',
        marginBottom: 8,

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    cardsRow: {
        display: 'flex',
        alignItems: 'center',
        overflowX: 'scroll',
        height: 272.95
    },

    card: {
        width: 200,
        height: 265,
        margin: '0 15px 0 0',
        flexShrink: 0,

        [theme.breakpoints.down('xs')]: { 
            width: '46.25vw',
            maxWidth: 220,
            margin: '0 2.5vw 0 0'
        }
    }
});

export default styles;