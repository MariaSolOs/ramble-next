import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    root: {
        color: '#FFF',
        transition: 'all 200ms ease-in-out',
        padding: 5,
        
        '&:hover': { color: '#2F2F2F' }
    },
    checked: {
        '&.MuiCheckbox-colorSecondary': {
            color: '#FFF'
        }
    }
});

export default styles;