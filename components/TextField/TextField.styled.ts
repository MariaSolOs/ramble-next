import { styled } from '@mui/material/styles';
import type { OutlinedTextFieldProps } from '@mui/material/TextField';

import MuiTextField from '@mui/material/TextField';

export const TextField = styled(MuiTextField)<OutlinedTextFieldProps>(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#2A2A2A',
        letterSpacing: '-0.05rem',
        fontWeight: theme.typography.fontWeightBold,
        color: '#FFF'
    },

    '& .MuiOutlinedInput-input': { padding: 13 },

    '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#CDCDCD !important' },

    '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: '#D8246E' },

    '& .MuiFormHelperText-root.Mui-error': {
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        color: '#D8246E',
        letterSpacing: '-0.02rem',
        marginLeft: 5
    },

    '& .MuiInputLabel-root': { opacity: 0 },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#CDCDCD !important',
        background: 'linear-gradient(to bottom, #151515 0%, #2A2A2A 60%)',
        paddingRight: 5,
        opacity: 1,
        fontWeight: theme.typography.fontWeightBold
    }
}));