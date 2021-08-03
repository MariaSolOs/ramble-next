import React, { useState } from 'react';
import { signIn } from 'next-auth/client';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from 'components/TextField';
import GradientButton from 'components/GradientButton';
import ForgotPasswordDialog from 'components/ForgotPasswordDialog';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogs.styles';
const useStyles = makeStyles(styles);

enum FormField {
    Email = 'email',
    Password = 'password'
}

const LogInDialog = () => {
    const { LogInDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const { showLogInDialog: open } = uiState;
    const classes = useStyles();

    // Form management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPwdDialog, setShowForgotPwdDialog] = useState(false);

    const handleClose = () => {
        setEmail('');
        setPassword('');
        uiDispatch({ type: 'CLOSE_LOG_IN_DIALOG' });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const signInResponse = await signIn('credentials', { 
            email, 
            password,
            redirect: false
        });

        if (signInResponse?.error) {
            const message = signInResponse.error;
            uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        }
        handleClose();
    }

    if (showForgotPwdDialog) {
        return (
            <ForgotPasswordDialog
            open={showForgotPwdDialog}
            onClose={() => setShowForgotPwdDialog(false)} />
        );
    }

    return (
        <Dialog 
        fullWidth 
        className={classes.dialog} 
        open={open}
        onClose={handleClose}>
            <div className={classes.header}>
                <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                <h5 className={classes.title}>{text.logIn}</h5>
            </div>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Email}>
                            {text.email}
                        </FormLabel>
                        <TextField
                        id={FormField.Email}
                        type="email"
                        required
                        fullWidth
                        className={classes.textField}
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Password}>
                            {text.password}
                        </FormLabel>
                        <TextField
                        id={FormField.Password}
                        type="password"
                        required
                        className={classes.textField}
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    </FormControl>
                    <p 
                    className={classes.forgotPasswordLink}
                    onClick={() => {
                        setShowForgotPwdDialog(true);
                        handleClose();
                    }}>
                        {text.forgotPassword}
                    </p>
                    <GradientButton 
                    variant="experience" 
                    type="submit"
                    className={classes.submitButton}>
                        {text.logIn}
                    </GradientButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default LogInDialog;