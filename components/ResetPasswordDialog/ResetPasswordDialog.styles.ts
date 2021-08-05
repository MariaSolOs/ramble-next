import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgb(30, 30, 30)',
            borderRadius: '1.1rem',
            padding: 10
        }
    },

    content: { padding: '8px 20px' },

    formControl: { marginBottom: 15 },

    label: {
        color: '#ECEBE5', 
        fontSize: '0.9rem',
        fontWeight: theme.typography.fontWeightBold,
        textIndent: 3,
        marginBottom: 5
    },

    button: {
        width: '100%',
        borderRadius: '0.2rem'
    }
});

export default styles;