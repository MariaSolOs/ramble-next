import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        backgroundColor: '#FFF',
        color: '#000',
        width: 250,
        height: 350,
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 10px 0',
        margin: '10vh auto 0',

        [theme.breakpoints.down('xs')]: { 
            width: '80vw',
            marginTop: 40 
        }
    },

    avatar: {
        width: 90,
        height: 90,
        border: '2.5px solid #C1C1C1'
    },

    creatorName: {
        fontSize: '1.5rem',
        marginBottom: 0
    },

    message: {
        textAlign: 'center',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: '0.95rem',
        margin: '0 0 1.5rem',
        maxWidth: '80%'
    },

    button: {
        borderRadius: 8,
        width: '70%'
    }
});

export default styles;