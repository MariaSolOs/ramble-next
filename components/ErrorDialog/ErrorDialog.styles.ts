import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderRadius: '1.1rem',
            padding: 20
        }
    },

    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },

    title: {
        fontSize: '1.1rem',
        color: '#FFF',
        letterSpacing: '-0.05rem',
        margin: 0
    },

    image: {
        width: 70,
        height: 70,
        marginRight: 15
    },

    message: {
        fontSize: '1rem',
        color: '#DFDFDF',
        letterSpacing: '-0.05rem',
        margin: '15px 0 0'
    }
});

export default styles;