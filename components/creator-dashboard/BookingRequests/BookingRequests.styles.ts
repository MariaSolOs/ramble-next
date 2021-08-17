import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        margin: '2rem 0 1rem',
        height: 'calc(100% - 73px - 3rem)',
        overflowX: 'scroll',
        
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            height: 'auto',
            margin: '1rem 0 0'
        }
    }
});

export default styles;