import useLanguageContext from 'context/languageContext';
import type { AllReviewsDialogProps } from './index';

import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AllReviewsDialog.styles';
const useStyles = makeStyles(styles);

const AllReviewsDialog = (props: AllReviewsDialogProps) => {
    const { AllReviewsDialog: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <Dialog 
        open
        // open={props.open} 
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth
        className={classes.dialog}>
            <div className={classes.header}>
                <h3 className={classes.title}>{text.title}</h3>
                <CloseIcon onClick={props.onClose} />
            </div>
        </Dialog>
    );
}

export default AllReviewsDialog;