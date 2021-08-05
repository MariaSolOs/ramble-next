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

import { makeStyles } from '@material-ui/core/styles';
import styles from './AuthDialogs.styles';
const useStyles = makeStyles(styles);

enum FormField {
    FirstName = 'firstName',
    LastName = 'lastName',
    Email = 'email',
    Password1 = 'password1',
    Password2 = 'password2'
}

type Form = Record<FormField, string>;

const initialForm: Form = {
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: ''
}

const SignUpDialog = () => {
    const { SignUpDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const { showSignUpDialog: open } = uiState;
    const classes = useStyles();

    const [values, setValues] = useState(initialForm);
    const [passwordError, setPasswordError] = useState(false);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        let newValue = event.target.value;

        // Names are automatically capitalized
        if (field === FormField.FirstName || field === FormField.LastName) {
            newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        }

        setValues(values => ({ ...values, [field]: newValue }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Password check
        if (values.password1 !== values.password2) {
            setPasswordError(true);
            return;
        }

        const signInResponse = await signIn('credentials', { 
            email: values.email,
            password: values.password1,
            firstName: values.firstName,
            lastName: values.lastName,
            redirect: false
        });

        if (signInResponse?.error) {
            const message = signInResponse.error;
            uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        }
        handleClose();
    }

    const handleClose = () => {
        setValues(initialForm);
        setPasswordError(false);
        uiDispatch({ type: 'CLOSE_SIGN_UP_DIALOG' });
    }

    return (
        <Dialog 
        fullWidth 
        className={classes.dialog} 
        open={open} 
        onClose={handleClose}>
            <div className={classes.header}>
                <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                <h5 className={classes.title}>{text.signUp}</h5>
            </div>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.FirstName}>
                            {text.firstName}
                        </FormLabel>
                        <TextField
                        id={FormField.FirstName}
                        name={FormField.FirstName}
                        className={classes.textField}
                        fullWidth
                        value={values.firstName}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.LastName}>
                            {text.lastName}
                        </FormLabel>
                        <TextField
                        id={FormField.LastName}
                        name={FormField.LastName}
                        className={classes.textField}
                        fullWidth
                        value={values.lastName}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <div className={classes.formDivisor} />
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Email}>
                            {text.email}
                        </FormLabel>
                        <TextField
                        id={FormField.Email}
                        name={FormField.Email}
                        type="email"
                        className={classes.textField}
                        fullWidth
                        value={values.email}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Password1}>
                            {text.password}
                        </FormLabel>
                        <TextField
                        id={FormField.Password1}
                        name={FormField.Password1}
                        type="password"
                        className={classes.textField}
                        fullWidth
                        value={values.password1}
                        onChange={handleFormChange}
                        required />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.formLabel} htmlFor={FormField.Password2}>
                            {text.confirmPassword}
                        </FormLabel>
                        <TextField
                        id={FormField.Password2}
                        name={FormField.Password2}
                        type="password"
                        className={classes.textField}
                        fullWidth
                        value={values.password2}
                        onChange={handleFormChange}
                        helperText={passwordError && text.passwordMismatch}
                        required />
                    </FormControl>
                    <p className={classes.switchDialogsText}>
                        {text.alreadyHaveAccount}&nbsp;&nbsp;
                        <span 
                        className={classes.switchDialogsLink} 
                        onClick={() => {
                            handleClose();
                            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
                        }}>
                            {text.logIn}
                        </span>
                    </p>
                    <GradientButton 
                    type="submit" 
                    variant="experience"
                    className={classes.submitButton}>
                        {text.continue}
                    </GradientButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default SignUpDialog;