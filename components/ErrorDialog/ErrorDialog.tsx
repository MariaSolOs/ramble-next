import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';

import Image from 'next/image';
import Dialog from '@material-ui/core/Dialog';
import errorImage from 'public/images/error-dialog-image.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ErrorDialog.styles';
const useStyles = makeStyles(styles);

const ErrorDialog = () => {
    const { ErrorDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const { errorMessage } = uiState;
    const classes = useStyles();

    return (
        <Dialog 
        maxWidth="sm" 
        className={classes.dialog}
        open={Boolean(errorMessage)}
        onClose={() => uiDispatch({ type: 'CLOSE_ERROR_DIALOG' })}>
            <div className={classes.header}>
                <div className={classes.image}>
                    <Image 
                    src={errorImage}
                    alt={errorMessage}
                    className={classes.image}
                    priority />
                </div>
                <h4 className={classes.title}>{text.title}</h4>
            </div>
            <p className={classes.message}>{errorMessage}</p>
        </Dialog>
    );
}

export default ErrorDialog;