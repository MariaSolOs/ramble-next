import React, { useState } from 'react';
import { signIn } from 'next-auth/client';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';

import Spinner from 'components/Spinner';
import * as S from './AuthDialogs.styled';

enum FormField {
    Email = 'email',
    Password = 'password'
}

const LogInDialog = () => {
    const { LogInDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const { showLogInDialog: open } = uiState;

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
        <S.Dialog fullWidth open={open} onClose={handleClose}>
            {loading && <Spinner />}
            <S.Header>
                <S.CloseIcon onClick={handleClose} />
                <S.Title>{text.logIn}</S.Title>
            </S.Header>
            <S.DialogContent>
                <form onSubmit={handleSubmit}>
                    <S.FormControl>
                        <S.FormLabel htmlFor={FormField.Email}>{text.email}</S.FormLabel>
                        <S.TextField
                        id={FormField.Email}
                        type="email"
                        required
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    </S.FormControl>
                    <S.FormControl>
                        <S.FormLabel htmlFor={FormField.Password}>{text.password}</S.FormLabel>
                        <S.TextField
                        id={FormField.Password}
                        type="password"
                        required
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    </S.FormControl>
                    <S.ForgotPasswordLink
                    onClick={() => {
                        uiDispatch({ type: 'OPEN_FORGOT_PASSWORD_DIALOG' });
                    }}>
                        {text.forgotPassword}
                    </S.ForgotPasswordLink>
                    <S.SwitchDialogsText>
                        {text.noAccountYet}&nbsp;&nbsp;
                        <S.SwitchDialogsLink
                        onClick={() => {
                            handleClose();
                            uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' });
                        }}>
                            {text.signUp}
                        </S.SwitchDialogsLink>
                    </S.SwitchDialogsText>
                    <S.SubmitButton variant="experience" type="submit">
                        {text.logIn}
                    </S.SubmitButton>
                </form>
            </S.DialogContent>
        </S.Dialog>
    );
}

export default LogInDialog;