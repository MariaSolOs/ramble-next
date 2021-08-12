import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.85rem',
        backgroundColor: 'rgba(49, 49, 49, 0.9)'
    },

    position: { top: 80 }
});

export default styles;