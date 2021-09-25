import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    hero: {
        width: '100vw',
        position: 'relative',
        height: '60vh',
        maxHeight: 430,

        [theme.breakpoints.down('xs')]: { height: '40vh' }
    },

    heroImg: {
        filter: 'grayscale(0.4) !important'
    },

    title: {
        position: 'absolute',
        top: '35%',
        whiteSpace: 'nowrap',
        fontSize: '2.4rem',
        width: '100%',
        textAlign: 'center',

        [theme.breakpoints.down('sm')]: { fontSize: '2.2rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.8rem' }
    }
});

export default styles;