import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '60vw',
        margin: '30vh auto 0',
        textAlign: 'center',

        [theme.breakpoints.down('sm')]: {
            width: '80vw',
            margin: '150px auto 0'
        }
    },

    message: {
        fontSize: '1.1rem',
        fontWeight: theme.typography.fontWeightRegular,

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    button: { width: 100 }
});

export default styles;