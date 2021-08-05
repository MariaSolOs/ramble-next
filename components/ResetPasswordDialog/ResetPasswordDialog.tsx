import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { signIn } from 'next-auth/client';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import { ResetPasswordDocument } from 'graphql-server/operations';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from 'components/TextField';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ResetPasswordDialog.styles';
const useStyles = makeStyles(styles);

enum FormField {
    Password1 = 'password1',
    Password2 = 'password2'
}
type Form = Record<FormField, string>;

const ResetPasswordDialog = () => {
    const { ResetPasswordDialog: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const router = useRouter();
    const { query } = router;
    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
        const [passwordMismatch, setPasswordMismatch] = useState(false);
        const [values, setValues] = useState<Form>({
            password1: '',
            password2: ''
        });

    // Check if URL has a reset password query
    useEffect(() => {
        if (query['password-reset']) {
            setOpen(true);
        }
    }, [query]);

    const [resetPassword] = useMutation(ResetPasswordDocument, {
        onCompleted: async ({ resetPassword }) => {
            const signInResponse = await signIn('credentials', {
                email: resetPassword.email,
                password: values.password1,
                redirect: false
            });
            if (signInResponse?.error) {
                const message = signInResponse.error;
                uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
            }
            handleClose();
        },
        onError: ({ graphQLErrors }) => {
            const message = graphQLErrors[0].message || "We couldn't reset your password...";
            uiDispatch({ type: 'OPEN_ERROR_DIALOG', message});
            handleClose();
        }
    });

    const handleClose = () => { 
        setOpen(false); 
        router.replace('/', undefined, { shallow: true });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Clear the error
        setPasswordMismatch(false);

        setValues(values => ({ 
            ...values,  
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Check passwords match
        if (values.password1 !== values.password2) {
            setPasswordMismatch(true);
            return;
        }

        const userId = query['password-reset'] as string;
        resetPassword({ variables: { userId, password: values.password1 } });
    }

    return (
        <Dialog open={open} maxWidth="xs" className={classes.dialog}>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel className={classes.label} htmlFor={FormField.Password1}>
                            {text.newPassword}
                        </FormLabel>
                        <TextField
                        id={FormField.Password1}
                        name={FormField.Password1}
                        type="password"
                        required
                        value={values.password1}
                        onChange={handleChange} />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <FormLabel className={classes.label} htmlFor={FormField.Password2}>
                            {text.confirmPassword}
                        </FormLabel>
                        <TextField
                        id={FormField.Password2}
                        name={FormField.Password2}
                        type="password"
                        required
                        value={values.password2}
                        onChange={handleChange}
                        helperText={passwordMismatch && text.passwordMismatch} />
                    </FormControl>
                    <GradientButton variant="experience" type="submit" className={classes.button}>
                        {text.resetPassword}
                    </GradientButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordDialog;