import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        maxWidth: 700,

        [theme.breakpoints.down('md')]: { maxWidth: 600 },
        [theme.breakpoints.down('sm')]: { maxWidth: 540 },
        [theme.breakpoints.down('xs')]: { width: '100%' }
    },

    subtitle: {
        fontSize: '1.3rem',
        margin: '10px 0 30px',

        [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    textField: {
        '& .MuiInputAdornment-root': {
            position: 'absolute',
            bottom: 20,
            right: 15
        },
        '& .MuiOutlinedInput-input': { padding: '0 0 15px' },
        '& .MuiInputBase-input': { width: 'cacl(100% - 30px)' }
    }
});

export default styles;