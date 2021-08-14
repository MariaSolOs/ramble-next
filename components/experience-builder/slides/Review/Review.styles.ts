import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    experienceContainer: {
        width: 450,

        [theme.breakpoints.down('xs')]: { width: '100%' }
    }
});

export default styles;