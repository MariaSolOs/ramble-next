import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    tip: {
        margin: '30px 0 0 10px',

        [theme.breakpoints.down('xs')]: { margin: '20px 0 0 5px' }
    },

    experiences: {
        display: 'flex',
        margin: '2rem 0 2rem 10px',
        overflowX: 'scroll',

        [theme.breakpoints.down('xs')]: {
            overflowX: 'hidden',
            overflowY: 'scroll',
            margin: '30px auto',
            width: '90vw',
            flexWrap: 'wrap'
        }
    },

    card: {
        width: 230,
        height: 275,
        marginRight: 30,
        flexShrink: 0,

        [theme.breakpoints.down('xs')]: { 
            maxWidth: 240,
            margin: '0 calc((100% - 240px) / 2) 20px'
        }
    }
});

export default styles;