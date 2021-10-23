import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';

import Image from 'next/image';
import Box from '@mui/material/Box';
import errorImage from 'public/images/error-dialog-image.png';
import * as S from './ErrorDialog.styled';

const ErrorDialog = () => {
    const { ErrorDialog: text } = useLanguageContext().appText;
    const { uiState, uiDispatch } = useUiContext();
    const { errorMessage } = uiState;

    return (
        <S.Dialog
        maxWidth="sm" 
        open={Boolean(errorMessage)}
        onClose={() => uiDispatch({ type: 'CLOSE_ERROR_DIALOG' })}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <S.Image>
                    <Image src={errorImage} alt={errorMessage} priority />
                </S.Image>
                <S.Title>{text.title}</S.Title>
            </Box>
            <S.Message>{errorMessage}</S.Message>
        </S.Dialog>
    );
}

export default ErrorDialog;