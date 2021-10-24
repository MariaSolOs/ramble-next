import { styled } from '@mui/material/styles';
import type { OutlinedTextFieldProps } from '@mui/material/TextField';

import MuiTextField from '@mui/material/TextField';
import MuiPaper from '@mui/material/Paper';

export const Paper = styled(MuiPaper)(({ theme }) => ({
    '&.MuiAutocomplete-paper': {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        marginTop: 6,

        '& li:hover': {
            color: '#FFF',
            transition: 'all 200ms ease-in-out'
        },

        '& .MuiAutocomplete-option[aria-selected="true"]': { 
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'transparent' }
        }
    }
}));

export const TextField = styled(MuiTextField)<OutlinedTextFieldProps>(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '2rem',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        padding: '12px 15px'
    },

    '& .MuiOutlinedInput-root .MuiOutlinedInput-input': { padding: 0 },

    '& .MuiAutocomplete-endAdornment': { display: 'none' },

    '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
}));
