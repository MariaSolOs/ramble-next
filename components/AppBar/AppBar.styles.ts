import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        opacity: 1,
        padding: '10px 0 0',
        transition: 'opacity 600ms',
        zIndex: 50,

        [theme.breakpoints.down('xs')]: { 
            height: 71,
            '& .MuiToolbar-gutters': {
                paddingLeft: '2.5vw'
            }
        }
    },

    scrolled: {
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 600ms'
    },

    brand: {
        width: 150,

        [theme.breakpoints.down('xs')]: {
            width: 120,
            height: 34
        }
    }
});

export default styles;