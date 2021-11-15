import { styled } from '@mui/material/styles';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import GradientButton from 'components/GradientButton';

export const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 30,

    [theme.breakpoints.down('sm')]: { 
        alignItems: 'center',
        marginBottom: 20
    }
}));

export const GoBackButton = styled(ChevronLeftRoundedIcon)(({ theme }) => ({
    fontSize: '2.6rem',
    marginBottom: -4,
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: { 
        fontSize: '2.1rem',
        marginBottom: 0
    }
}));

export const StepTitle = styled('h5')(({ theme }) => ({
    fontSize: '2rem',
    margin: '0 2.3rem 0 0',
    lineHeight: 1.1,
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.6rem' }
}));

export const StepSubtitle = styled('p')(({ theme }) => ({
    color: '#CDCDCD',
    margin: '0 1.8rem 0 0',
    fontSize: '1.2rem',
    
    [theme.breakpoints.down('sm')]: { display: 'none' }
}));
    
export const NextButton = styled(GradientButton)(({ theme }) => ({
    margin: '1rem auto 0 auto',
    display: 'block',
    maxWidth: '100%',
    borderRadius: 6,
    height: 32,
    transition: 'all 300ms ease-in-out',
    '&:disabled': { filter: 'brightness(40%)' },
    
    [theme.breakpoints.down('sm')]: { margin: '1rem auto 40px auto' }
}));