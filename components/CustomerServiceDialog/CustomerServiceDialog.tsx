import useLanguageContext from 'context/languageContext';
import type { CustomerServiceDialogProps } from './index';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CustomerServiceDialog.styles';
const useStyles = makeStyles(styles);

/* This dialog is not controlled with the UI context, since it can be opened
 * only from the footer and no other dialog can be displayed 
 * at the same time. */
const CustomerServiceDialog = (props: CustomerServiceDialogProps) => {
    const { CustomerServiceDialog: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <Dialog className={classes.dialog} open={props.open} onClose={props.onClose}>
            <h4 className={classes.title}>{text.title}</h4>
            <p className={classes.greyText}>{text.message}</p>
            <DialogContent className={classes.content}>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon className={classes.icon} icon={faPhoneAlt}/>
                    <p className={classes.greyText}>+ 1 (514) 654-7156</p>
                </div>
                <div className={classes.contactInfo}>
                    <FontAwesomeIcon className={classes.icon} icon={faEnvelope}/>
                    <p className={classes.greyText}>phil.ramble@outlook.com </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CustomerServiceDialog;