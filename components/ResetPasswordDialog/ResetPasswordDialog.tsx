import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import { getGraphQLClient } from 'lib/graphql';
import { getSdk } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import type { ResetPasswordDialogProps } from './index';

import DialogContent from '@mui/material/DialogContent';
import TextField from 'components/TextField';
import * as S from './ResetPasswordDialog.styled';

enum FormField {
    Password1 = 'password1',
    Password2 = 'password2'
}
type Form = Record<FormField, string>;

const graphQLClient = getGraphQLClient();
const sdk = getSdk(graphQLClient);

const ResetPasswordDialog = (props: ResetPasswordDialogProps) => {
    const { ResetPasswordDialog: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const router = useRouter();
    
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [values, setValues] = useState<Form>({
        password1: '',
        password2: ''
    });

    const handleClose = () => { 
        // Remove the query from the URL
        router.replace('/', undefined, { shallow: true });
        props.onClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Clear the error
        setPasswordMismatch(false);

        setValues(values => ({ 
            ...values,  
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Check passwords match
            if (values.password1 !== values.password2) {
                setPasswordMismatch(true);
                return;
            }

            const userId = router.query['password-reset'] as string;
            const data = await sdk.resetPassword({
                userId, 
                password: values.password1
            }); 

            const signInResponse = await signIn('credentials', {
                email: data.resetPassword.email,
                password: values.password1,
                redirect: false
            });

            if (signInResponse?.error) {
                const message = signInResponse.error;
                uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
            }

        } catch (err: any) {
            const message = err.message || "We couldn't reset your password...";
            uiDispatch({ type: 'OPEN_ERROR_DIALOG', message });
        } finally {
            handleClose();
        }
    }

    return (
        <S.Dialog open={props.open} maxWidth="xs">
            <DialogContent sx={{ p: '8px 20px' }}>
                <form onSubmit={handleSubmit}>
                    <S.FormControl fullWidth>
                        <S.FormLabel htmlFor={FormField.Password1}>
                            {text.newPassword}
                        </S.FormLabel>
                        <TextField
                        id={FormField.Password1}
                        name={FormField.Password1}
                        type="password"
                        required
                        value={values.password1}
                        onChange={handleChange} />
                    </S.FormControl>
                    <S.FormControl fullWidth>
                        <S.FormLabel htmlFor={FormField.Password2}>
                            {text.confirmPassword}
                        </S.FormLabel>
                        <TextField
                        id={FormField.Password2}
                        name={FormField.Password2}
                        type="password"
                        required
                        value={values.password2}
                        onChange={handleChange}
                        helperText={passwordMismatch && text.passwordMismatch} />
                    </S.FormControl>
                    <S.Button variant="experience" type="submit">
                        {text.resetPassword}
                    </S.Button>
                </form>
            </DialogContent>
        </S.Dialog>
    );
}

export default ResetPasswordDialog;