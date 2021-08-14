import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    checkboxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 200,
        marginTop: 20
    },

    checkboxField: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.1rem'
    },

    greyCaps: {
        color: '#CDCDCD',
        textTransform: 'uppercase',
        fontSize: '1rem',
        margin: '2rem 0 10px',
        display: 'inline-block',

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    plusMinus: {
        width: 300,

        [theme.breakpoints.down('xs')]: { width: '100%' }
    }
});

export default styles;