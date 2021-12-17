import { styled } from '@mui/material/styles';

export const Title = styled('h2')(({ theme }) => ({
    fontSize: '2rem',
    margin: 0,
    
    [theme.breakpoints.down('md')]: { fontSize: '1.7rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' }
}));

export const Subtitle = styled('h4')(({ theme }) => ({
    fontSize: '1.4rem',
    color: '#CDCDCD',
    margin: 0,

    [theme.breakpoints.down('md')]: { fontSize: '1.1rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));