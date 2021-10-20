import useUiContext from 'context/uiContext';

import * as S from './Snackbar.styled';

const Snackbar = () => {
    const { uiState, uiDispatch } = useUiContext();
    const { snackbarMessage } = uiState;

    return (
        <S.Snackbar
        open={Boolean(snackbarMessage)}
        message={snackbarMessage}
        onClose={() => uiDispatch({ type: 'CLOSE_SNACKBAR' })}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }} />
    );
}

export default Snackbar;