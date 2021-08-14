import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    tip: {
        margin: '1rem 0 30px'
    },

    fieldContainer: { display: 'flex' },

    textfield: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        color: '#929293',
        backgroundColor: '#2A2A2A',
        width: '90%',
        padding: '10px 15px',
        height: 45,
        borderRadius: '2rem',

        '& .MuiInputBase-input': { textAlign: 'center' }
    },

    fieldButtons: {
        display: 'flex',
        flexDirection: 'column',
        width: '10%'
    },

    fieldButton: {
        color: '#2A2A2A',
        cursor: 'pointer',
        '&:hover': {
            color: '#FFF',
            transition: 'all 200ms ease-in-out'
        }
    }
});

export default styles;