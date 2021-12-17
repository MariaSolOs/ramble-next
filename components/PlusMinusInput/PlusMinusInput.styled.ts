import { styled } from '@mui/material/styles';
import type { InputBaseProps as MuiInputBaseProps } from '@mui/material/InputBase';

import MuiInputBase from '@mui/material/InputBase';
import MuiInputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

export const InputBase = styled(MuiInputBase, {
    shouldForwardProp: prop => prop !== 'inputLength'
})<MuiInputBaseProps & { inputLength: number; }>(({ theme, inputLength }) => ({
    backgroundColor: '#2A2A2A',
    color: '#929293',
    borderRadius: '2rem',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1rem',
    padding: '7px 15px',
    justifyContent: 'center',
    height: 47,

    '& .MuiInputBase-input': {
        width: theme.spacing(inputLength * 3),
        textAlign: 'center'
    }
}));

export const InputAdornment = styled(MuiInputAdornment)(({ theme }) => ({
    '& .MuiTypography-body1' : {
        color: '#929293',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem'
    }
}));

export const Button = styled(Box)({
    color: '#2A2A2A',
    cursor: 'pointer',
    
    '&:hover': {
        color: '#FFF',
        transition: 'all 200ms ease-in-out',
    }
});