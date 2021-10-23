import React, { useState } from 'react';
import { signIn } from 'next-auth/client';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';

import Spinner from 'components/Spinner';
import * as S from './AuthDialogs.styled';

enum FormField {
    FirstName = 'firstName',
    LastName = 'lastName',
    PhoneNumber = 'phoneNumber',
    Email = 'email',
    Password1 = 'password1',
    Password2 = 'password2'
}

type Form = Record<FormField, string>;

const initialForm: Form = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password1: '',
    password2: ''
}

const SignUpDialog = () => {
    const { SignUpDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const { showSignUpDialog: open } = uiState;

    const [values, setValues] = useState(initialForm);
    const [loading, setLoading] = useState(false);
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

        setLoading(true);

        // Make sure passwords match
        if (values.password1 !== values.password2) {
            setLoading(false);
            setPasswordError(true);
            return;
        }

        const signInResponse = await signIn('credentials', { 
            email: values.email,
            password: values.password1,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
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
        setLoading(false);
        uiDispatch({ type: 'CLOSE_SIGN_UP_DIALOG' });
    }

    return (
        <S.Dialog fullWidth open={open} onClose={handleClose}>
            {loading && <Spinner />}
            <S.Header>
                <S.CloseIcon onClick={handleClose} />
                <S.Title>{text.signUp}</S.Title>
            </S.Header>
            <S.DialogContent>
                <form onSubmit={handleSubmit}>
                    <S.FormControl sx={{ display: 'inline-block', mr: '2%', width: '49%' }}>
                        <S.FormLabel htmlFor={FormField.FirstName}>
                            {text.firstName}
                        </S.FormLabel>
                        <S.TextField
                        id={FormField.FirstName}
                        name={FormField.FirstName}
                        value={values.firstName}
                        onChange={handleFormChange}
                        fullWidth
                        required />
                    </S.FormControl>
                    <S.FormControl sx={{ display: 'inline-block', width: '49%' }}>
                        <S.FormLabel htmlFor={FormField.LastName}>
                            {text.lastName}
                        </S.FormLabel>
                        <S.TextField
                        id={FormField.LastName}
                        name={FormField.LastName}
                        value={values.lastName}
                        onChange={handleFormChange}
                        fullWidth
                        required />
                    </S.FormControl>
                    <S.FormDivisor />
                    <S.FormControl>
                        <S.FormLabel htmlFor={FormField.PhoneNumber}>
                            {text.phoneNumber}
                        </S.FormLabel>
                        <S.TextField
                        id={FormField.PhoneNumber}
                        name={FormField.PhoneNumber}
                        type="tel"
                        fullWidth
                        value={values.phoneNumber}
                        onChange={handleFormChange}
                        required />
                    </S.FormControl>
                    <S.FormControl>
                        <S.FormLabel htmlFor={FormField.Email}>
                            {text.email}
                        </S.FormLabel>
                        <S.TextField
                        id={FormField.Email}
                        name={FormField.Email}
                        type="email"
                        fullWidth
                        value={values.email}
                        onChange={handleFormChange}
                        required />
                    </S.FormControl>
                    <S.FormControl>
                        <S.FormLabel htmlFor={FormField.Password1}>
                            {text.password}
                        </S.FormLabel>
                        <S.TextField
                        id={FormField.Password1}
                        name={FormField.Password1}
                        type="password"
                        fullWidth
                        value={values.password1}
                        onChange={handleFormChange}
                        required />
                    </S.FormControl>
                    <S.FormControl>
                        <S.FormLabel htmlFor={FormField.Password2}>
                            {text.confirmPassword}
                        </S.FormLabel>
                        <S.TextField
                        id={FormField.Password2}
                        name={FormField.Password2}
                        type="password"
                        fullWidth
                        value={values.password2}
                        onChange={handleFormChange}
                        helperText={passwordError && text.passwordMismatch}
                        required />
                    </S.FormControl>
                    <S.SwitchDialogsText>
                        {text.alreadyHaveAccount}&nbsp;&nbsp;
                        <S.SwitchDialogsLink
                        onClick={() => {
                            handleClose();
                            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
                        }}>
                            {text.logIn}
                        </S.SwitchDialogsLink>
                    </S.SwitchDialogsText>
                    <S.SubmitButton type="submit" variant="experience">
                        {text.continue}
                    </S.SubmitButton>
                </form>
            </S.DialogContent>
        </S.Dialog>
    );
}

export default SignUpDialog;