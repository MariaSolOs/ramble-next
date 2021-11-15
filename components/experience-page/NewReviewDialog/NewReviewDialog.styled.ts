import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import MuiCloseIcon from '@mui/icons-material/Close';
import TextField from 'components/TextField';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        color: '#FFF',
        borderRadius: '1rem',
        padding: '1.3rem 1.1rem 1.1rem'
    }
});

export const Title = styled('h3')(({ theme }) => ({
    margin: 0,
    fontSize: '1.25rem',
    whiteSpace: 'nowrap',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const CloseIcon = styled(MuiCloseIcon)(({ theme }) => ({
    color: '#656565',
    cursor: 'pointer',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const ReviewTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-input': { 
        fontSize: '0.9rem',
        padding: 0,
    
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
            width: '98%'
        }
    },
    
    '& .MuiInputAdornment-positionEnd': {
        position: 'absolute',
        right: 15,
        bottom: 20, 
        fontSize: '0.8rem'
    }
}));

export const DoneButton = styled('button')(({ theme }) => ({
    margin: '10px 0 0 auto',
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: '#FFF',
    backgroundColor: 'transparent',
    border: 'none',
    letterSpacing: '-0.05rem',
    fontSize: '0.9rem'
}));
