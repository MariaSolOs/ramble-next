import React, { useState } from 'react';

import useUiContext from 'context/uiContext';
import useLanguageContext from 'context/languageContext';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import TextField from 'components/TextField';
import GradientButton from 'components/GradientButton';
import Spinner from 'components/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ForgotPasswordDialog.styles';
const useStyles = makeStyles(styles);

const ForgotPasswordDialog = () => {
    const { ForgotPasswordDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        fetch('/api/email/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(res => {
            setLoading(false);
            if (res.ok) {
                setShowSuccessMessage(true);
            } else if (res.status === 422) {
                setErrorMessage("We couldn't find an account with that email...");
            } else {
                setErrorMessage('Something went wrong...');
            }
        })
        .catch(() => {
            setLoading(false);
            setErrorMessage('Something went wrong...');
        });
    }

    return (
        <Dialog 
        open={uiState.showForgotPasswordDialog} 
        onClose={() => uiDispatch({ type: 'CLOSE_FORGOT_PASSWORD_DIALOG' })}
        className={classes.dialog}>
            {loading && <Spinner />}
            {showSuccessMessage ? 
                <div className={classes.emailSentContainer}>
                    <FontAwesomeIcon icon={faPaperPlane} className={classes.planeIcon} />
                    <p className={classes.title}>{text.emailSent}</p>
                </div> :
                <>
                    <CloseIcon 
                    onClick={() => uiDispatch({ type: 'CLOSE_FORGOT_PASSWORD_DIALOG' })} 
                    className={classes.closeIcon} />
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <h4 className={classes.title}>{text.enterEmailTitle}</h4>
                            <p className={classes.message}>{text.sendLinkMessage}</p>
                            <TextField 
                            fullWidth
                            required
                            type="email"
                            value={email}
                            helperText={errorMessage}
                            onChange={event => setEmail(event.target.value)} />
                            <GradientButton 
                            variant="experience"
                            type="submit"
                            className={classes.button}>
                                {text.resetPassword}
                            </GradientButton>
                        </form>
                    </DialogContent>
                </>}
        </Dialog>   
    );
}

export default ForgotPasswordDialog;