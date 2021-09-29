import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    hero: {
        width: '100vw',
        position: 'relative',
        height: '55vh',
        maxHeight: 430,

        [theme.breakpoints.down('xs')]: { height: '40vh' }
    },

    heroImg: {
        filter: 'grayscale(0.5) !important'
    },

    title: {
        position: 'absolute',
        top: '35%',
        fontSize: '2.4rem',
        width: '100%',
        textAlign: 'center',

        [theme.breakpoints.down('sm')]: { fontSize: '2.1rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.7rem' }
    }
});

export default styles;