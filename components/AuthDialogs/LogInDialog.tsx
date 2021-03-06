import React, { useState } from 'react';
import { signIn } from 'next-auth/client';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';

import Spinner from 'components/Spinner';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from 'components/TextField';
import GradientButton from 'components/GradientButton';

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
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setEmail('');
        setPassword('');
        setLoading(false);
        uiDispatch({ type: 'CLOSE_LOG_IN_DIALOG' });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

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

    return (
        <Dialog 
        fullWidth 
        className={classes.dialog} 
        open={open}
        onClose={handleClose}>
            {loading && <Spinner />}
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
                        uiDispatch({ type: 'OPEN_FORGOT_PASSWORD_DIALOG' });
                    }}>
                        {text.forgotPassword}
                    </p>
                    <p className={classes.switchDialogsText}>
                        {text.noAccountYet}&nbsp;&nbsp;
                        <span 
                        className={classes.switchDialogsLink} 
                        onClick={() => {
                            handleClose();
                            uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' });
                        }}>
                            {text.signUp}
                        </span>
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