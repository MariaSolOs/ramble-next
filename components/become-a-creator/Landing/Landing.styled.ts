import { styled } from '@mui/material/styles';

import GradientButton from 'components/GradientButton';

export const Slide = styled('div')(({ theme }) => ({
    margin: '100px auto 0',
    boxSizing: 'border-box',
    display: 'flex',
    width: '65vw',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    [theme.breakpoints.down('sm')]: { width: '90vw' }
}));

export const Title = styled('h1')(({ theme }) => ({
    color: '#E6E6E6',
    margin: 0,
    fontSize: '2.3rem',
    whiteSpace: 'nowrap',
    
    [theme.breakpoints.down('md')]: { fontSize: '1.7rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' }
}));

export const Image = styled('div')(({ theme }) => ({
    width: 380,
    height: 'auto',
    borderRadius: '2rem',
    overflow: 'hidden',
    
    [theme.breakpoints.down('lg')]: { width: 320 },
    [theme.breakpoints.down('md')]: { 
        width: '50%',
        marginLeft: '2%',
        borderRadius: '0.8rem'
    },
    [theme.breakpoints.down('sm')]: { width: '46%' }
}));

export const Button = styled(GradientButton)(({ theme }) => ({
    padding: '10px 20px',
    marginTop: '2rem',
    width: 130,
    fontSize: '1.05rem',
    
    [theme.breakpoints.down('sm')]: {
        width: 90,
        fontSize: '0.7rem',
        padding: '0.4rem 0.7rem',
        marginTop: '1.4rem'
    }
}));