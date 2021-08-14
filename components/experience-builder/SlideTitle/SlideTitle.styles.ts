import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        fontSize: '2rem',
        margin: 0,

        [theme.breakpoints.down('sm')]: { fontSize: '1.7rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.5rem' }
    }
});

export default styles;