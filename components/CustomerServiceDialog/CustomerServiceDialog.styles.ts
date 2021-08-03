import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            borderRadius: '1.1rem',
            padding: 20
        }
    },

    title: {
        fontSize: '1.2rem',
        color: '#ECEBE5',
        margin: 0,

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    greyText: {
        color: '#C0BFBA',
        margin: '5px 0',
        fontSize: '1rem',

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    content: { padding: '8px 8px 0' },

    contactInfo: {
        display: 'flex',
        alignItems: 'center'
    },

    icon: {
        color: '#C0BFBA',
        fontSize: '1.25rem',
        marginRight: '1rem'
    }
});

export default styles;