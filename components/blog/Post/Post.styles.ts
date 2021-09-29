import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    wrapper: {
        margin: '50px auto 0',
        width: '60vw',
        fontFamily: 'Questrial, sans-serif',

        [theme.breakpoints.down('sm')]: { width: '80vw' }
    },

    title: { margin: '0 0 -8px' },

    subtitle: {
        fontSize: '1rem',
        fontWeight: theme.typography.fontWeightBold,
        margin: '8px 0 0',
        display: 'block'
    },

    divisor: {
        backgroundColor: '#C0BFBA',
        padding: '1px 0',
        width: '40%'
    },

    paragraph: {
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: '1.1rem'
    },

    footer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '70px auto 50px'
    }
});

export default styles;