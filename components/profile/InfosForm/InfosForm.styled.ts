import { styled } from '@mui/material/styles';

import MuiFormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import GradientButton from 'components/GradientButton';

export const Form = styled('form')(({ theme }) => ({
    margin: '30px 0 60px 20px',
    maxWidth: 950,
    
    [theme.breakpoints.down('sm')]: { 
        marginTop: 20,
        margin: '20px auto 70px'
    }
}));

export const Label = styled(FormLabel)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: '#FFF',
    marginBottom: 5,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' }
}));

export const FormControl = styled(MuiFormControl)(({ theme }) => ({
    marginBottom: '1rem',
    width: '40%',
    marginRight: '60%',
    
    '&:first-of-type, &:nth-of-type(2)': { marginRight: '5%' },
    
    [theme.breakpoints.down('md')]: { width: '45%' },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 0 1rem',

        '&:first-of-type': {
            width: '48%', 
            marginRight: '4%' 
        },
        '&:nth-of-type(2)': { 
            width: '48%',
            marginRight: 0
        }
    }
}));

export const CreatorBio = styled(FormControl)(({ theme }) => ({
    width: '85%',
    margin: '0 0 1rem',
    
    '& .MuiInputAdornment-positionEnd': {
        margin: 0,
        position: 'absolute',
        bottom: 20, 
        right: 20,
        fontSize: '0.8rem'
    },
    
    [theme.breakpoints.down('md')]: { width: '95%' },
    [theme.breakpoints.down('sm')]: { width: '100%' }
}));

export const Footer = styled('footer')(({ theme }) => ({
    position: 'fixed',
    bottom: 0, 
    left: 0, 
    right: 0,
    display: 'flex',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#1C1C1C',
    zIndex: 5,
    
    [theme.breakpoints.down('sm')]: { height: 60 }
}));

export const SubmitButton = styled(GradientButton)(({ theme }) => ({
    height: 40,
    borderRadius: '0.5rem',
    fontSize: '0.9rem',
    padding: '0 10px',
    margin: '0 15px 0 auto',
    
    [theme.breakpoints.down('md')]: { fontSize: '0.8rem' }
}));
