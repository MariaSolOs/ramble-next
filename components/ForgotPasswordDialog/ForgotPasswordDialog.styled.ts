import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import MuiCloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientButton from 'components/GradientButton';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1rem',
        padding: 15,
        maxWidth: 500
    }
});

export const EmailSentContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem 0'
});

export const PlaneIcon = styled(FontAwesomeIcon)({
    fontSize: '2rem',
    marginRight: '1rem',
    color: '#FFF'
});

export const Title = styled(Box)({
    color: '#ECEBE5',
    margin: 0,
    fontSize: '1.1rem'
});

export const CloseIcon = styled(MuiCloseIcon)(({ theme }) => ({
    color: '#FFF',
    fontSize: '1.5rem',
    cursor: 'pointer',
    float: 'left',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
}));

export const Message = styled('p')({
    color: '#C0BFBA',
    margin: '1rem 0',
    fontSize: '0.9rem'
});

export const Button = styled(GradientButton)({
    width: '100%',
    borderRadius: '0.2rem',
    marginTop: 15
});