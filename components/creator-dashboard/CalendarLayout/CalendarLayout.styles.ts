import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        height: 'calc(100% - 73px - 1rem)',
        width: '100%',
        display: 'flex',
        margin: '0 auto 1rem',
        maxWidth: 1300,

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            height: 'calc(100% - 67px - 1rem)'
        }
    },

    infosContainer: {
        width: '38%',
        marginLeft: '2%',
        height: '100%'
    }
});

export default styles;