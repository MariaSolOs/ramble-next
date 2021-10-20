import { styled } from '@mui/material/styles';

import MuiSnackbar from '@mui/material/Snackbar';

export const Snackbar = styled(MuiSnackbar)(({ theme }) => ({
    backgroundColor: 'rgba(49, 49, 49, 0.9)',

    '& .MuiSnackbarContent-message': {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.85rem'
    },

    '&.MuiSnackbar-anchorOriginTopRight': { top: 80 }
}));
