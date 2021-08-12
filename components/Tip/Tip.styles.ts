import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        color: '#CDCDCD',
        fontSize: '0.95rem',
        fontWeight: theme.typography.fontWeightRegular
    },

    icon: {
        fontSize: '1.3rem',
        marginRight: '0.5rem'
    }
});

export default styles;