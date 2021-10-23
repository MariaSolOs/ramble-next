import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiFormControl from '@mui/material/FormControl';
import MuiFormLabel from '@mui/material/FormLabel';
import MuiCloseIcon from '@mui/icons-material/Close';
import BaseTextField from 'components/TextField';
import GradientButton from 'components/GradientButton';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1rem',
        padding: 10,
        maxWidth: 500
    }
});

export const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: { padding: 8 }
}));

export const Header = styled('div')({
    display: 'flex', 
    padding: '14px 16px 11px'
});

export const CloseIcon = styled(MuiCloseIcon)(({ theme }) => ({
    color: '#FFF',
    fontSize: '1.5rem',
    cursor: 'pointer',
    float: 'left',

    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
}));

export const Title = styled('h5')(({ theme }) => ({
    margin: 'auto',
    textIndent: -22,
    fontSize: '1.2rem',
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.03rem',
    color: '#ECEBE5',

    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const FormControl = styled(MuiFormControl)({
    display: 'block',
    marginBottom: 15
});

export const FormLabel = styled(MuiFormLabel)(({ theme }) => ({
    color: '#ECEBE5', 
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.85rem',
    letterSpacing: '-0.03rem',
    margin: '0 0 5px 3px',

    [theme.breakpoints.down('sm')]: { fontSize: '0.75rem' }
}));

export const TextField = styled(BaseTextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': {
        [theme.breakpoints.down('sm')]: { padding: 10 }
    }
}));

export const ForgotPasswordLink = styled('p')({
    color: '#ECEBE5',
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '0 3px 15px',
    fontSize: '0.8rem'
});

export const SwitchDialogsText = styled('p')(({ theme }) => ({
    fontSize: '0.78rem',
    fontWeight: theme.typography.fontWeightRegular,
    color: '#6F6E6B',
    letterSpacing: '-0.03rem',
    textAlign: 'center'
}));

export const SwitchDialogsLink = styled('span')({
    color: '#ECEBE5',
    textDecoration: 'underline',
    cursor: 'pointer'
});

export const SubmitButton = styled(GradientButton)({
    width: '100%',
    borderRadius: '0.2rem'
});

export const FormDivisor = styled('div')({
    width: '30%',
    minWidth: 100,
    padding: '1.5%',
    margin: '0 auto 15px',
    borderBottom: 'solid 1px #4F4F4F'
});
