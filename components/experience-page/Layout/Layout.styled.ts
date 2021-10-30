import { styled } from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import GradientButton from 'components/GradientButton';

export const ExperienceContainer = styled('main')(({ theme }) => ({
    height: 'calc(100vh - 100px)',
    marginTop: 100,
    width: '100vw',
    padding: '0 6vw',
    backgroundColor: '#000',
    display: 'flex',
    
    [theme.breakpoints.down('lg')]: { padding: '0 1vw' },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 70,
        height: 'auto'
    }
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

export const GoBackIcon = styled(ArrowBackRoundedIcon)(({ theme }) => ({
    fontSize: '1.8rem',
    marginLeft: 10,
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: { display: 'none' }
}));
    
export const PriceText = styled('p')(({ theme }) => ({
    color: '#BFBFBF',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '-0.03rem',
    margin: '0 auto 0 calc(50% - 85px)',
    
    [theme.breakpoints.down('sm')]: { 
        fontSize: '0.75rem',
        margin: '0 auto'
    }
}));

export const Price = styled('span')(({ theme }) => ({
    color: '#FFF',
    fontSize: '1.5rem',
    display: 'inline-block',
    margin: '0 3px',
    
    '&:first-letter': { fontSize: '1rem' },
    
    [theme.breakpoints.down('md')]: { fontSize: '1.2rem' }
}));

export const BookingButton = styled(GradientButton)(({ theme }) => ({
    height: 40,
    width: '7rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    padding: '0 10px',
    marginRight: 120,
    
    [theme.breakpoints.down('md')]: { 
        marginRight: 10,
        fontSize: '0.9rem',
        width: 100
    }
}));