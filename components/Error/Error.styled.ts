import { styled } from '@mui/material/styles';

import GradientButton from 'components/GradientButton';

export const Main = styled('main')(({ theme }) => ({
    fontFamily: theme.typography.questrial.fontFamily,
    width: '90vw',
    margin: '30vh auto 0',
    
    [theme.breakpoints.down('sm')]: { marginTop: '20vh' }
}));

export const StatusCode = styled('h1')(({ theme }) => ({
    fontSize: '3.5rem',
    margin: 0,
    
    [theme.breakpoints.down('sm')]: { fontSize: '2.5rem' }
}));

export const WhiteTitle = styled('h2')(({ theme }) => ({
    fontSize: '2.5rem',
    margin: 0,
    
    [theme.breakpoints.down('sm')]: { fontSize: '2rem' }
}));

export const GreyTitle = styled('h2')(({ theme }) => ({
    fontSize: '2.2rem',
    margin: '0 0 50px',
    color: '#ACACAC',

    [theme.breakpoints.down('sm')]: { fontSize: '1.8rem' }
}));

export const Button = styled(GradientButton)({
    borderRadius: 10,
    height: 40
});