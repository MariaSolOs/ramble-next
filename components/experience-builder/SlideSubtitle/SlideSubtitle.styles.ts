import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        fontSize: '1.4rem',
        color: '#CDCDCD',
        margin: 0,

        [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    }
});

export default styles;