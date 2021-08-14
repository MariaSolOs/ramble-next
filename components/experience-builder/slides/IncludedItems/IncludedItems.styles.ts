import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    textfield: {
        width: 340,
        [theme.breakpoints.down('sm')]: { width: 'calc(100% - 48px)' }
    },

    addIcon: {
        fontSize: '3rem',
        color: '#808080',
        cursor: 'pointer',
        '&:hover': { 
            color: '#CDCDCD',
            transform: 'scale(1.05)',
            transition: 'transform 300ms ease-in-out'
        }
    },

    errMsg: {
        color: '#D8246E',
        letterSpacing: '-0.02rem',
        fontSize: '0.8rem',
        height: 18,
        margin: '10px 0'
    },

    chipList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 388,

        [theme.breakpoints.down('sm')]: { width: '100%' }
    },

    chip: { margin: '0 10px 10px 0' }
});

export default styles;