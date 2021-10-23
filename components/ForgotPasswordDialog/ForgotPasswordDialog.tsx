import React, { useState } from 'react';

import useUiContext from 'context/uiContext';
import useLanguageContext from 'context/languageContext';

import DialogContent from '@mui/material/DialogContent';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons/faPaperPlane';
import Spinner from 'components/Spinner';
import TextField from 'components/TextField';
import * as S from './ForgotPasswordDialog.styled';

const ForgotPasswordDialog = () => {
    const { ForgotPasswordDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();

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
        <S.Dialog 
        open={uiState.showForgotPasswordDialog} 
        onClose={() => uiDispatch({ type: 'CLOSE_FORGOT_PASSWORD_DIALOG' })}>
            {loading && <Spinner />}
            {showSuccessMessage ?
                <S.EmailSentContainer>
                    <S.PlaneIcon icon={faPaperPlane} />
                    <S.Title as="p">{text.emailSent}</S.Title>
                </S.EmailSentContainer> :
                <>
                    <S.CloseIcon onClick={() => uiDispatch({ type: 'CLOSE_FORGOT_PASSWORD_DIALOG' })} />
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <S.Title as="h4">{text.enterEmailTitle}</S.Title>
                            <S.Message>{text.sendLinkMessage}</S.Message>
                            <TextField 
                            fullWidth
                            required
                            type="email"
                            value={email}
                            helperText={errorMessage}
                            onChange={event => setEmail(event.target.value)} />
                            <S.Button variant="experience" type="submit">
                                {text.resetPassword}
                            </S.Button>
                        </form>
                    </DialogContent>
                </>}
        </S.Dialog>
    );
}

export default ForgotPasswordDialog;