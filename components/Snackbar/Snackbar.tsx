import useUiContext from 'context/uiContext';

import MUISnackbar from '@material-ui/core/Snackbar';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Snackbar.styles';
const useStyles = makeStyles(styles);

const Snackbar = () => {
    const classes = useStyles();
    
    const { uiState, uiDispatch } = useUiContext();
    const { snackbarMessage } = uiState;

    return (
        <MUISnackbar
        anchorOrigin={{ 
            vertical: 'top', 
            horizontal: 'right'
        }}
        ContentProps={{ 
            classes: { root: classes.root }
        }}
        classes={{ anchorOriginTopRight: classes.position }}
        open={Boolean(snackbarMessage)}
        onClose={() => uiDispatch({ type: 'CLOSE_SNACKBAR' })}
        message={snackbarMessage} />
    );
}

export default Snackbar;