import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    tip: {
        maxWidth: 650,
        marginTop: 20
    },

    capacityField: {
        width: '50%',
        [theme.breakpoints.down('sm')]: { 
            width: '80%',
            minWidth: 250
        }
    }
});

export default styles;