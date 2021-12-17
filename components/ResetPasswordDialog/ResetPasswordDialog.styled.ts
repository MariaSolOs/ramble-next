import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import MuiFormLabel from '@mui/material/FormLabel';
import MuiFormControl from '@mui/material/FormControl';
import GradientButton from 'components/GradientButton';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '1.1rem',
        padding: 10
    }
});

export const FormLabel = styled(MuiFormLabel)(({ theme }) => ({
    color: '#ECEBE5', 
    fontSize: '0.9rem',
    fontWeight: theme.typography.fontWeightBold,
    textIndent: 3,
    marginBottom: 5
}));

export const FormControl = styled(MuiFormControl)({ marginBottom: 15 });

export const Button = styled(GradientButton)({
    width: '100%',
    borderRadius: '0.2rem'
});