import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    width: '70vw',
    margin: '50px auto',
    display: 'flex',
    flexWrap: 'wrap',
    
    [theme.breakpoints.down('lg')]: { width: '80vw' },
    [theme.breakpoints.down('md')]: { width: '90vw' }
}));

export const Card = styled('a')(({ theme }) => ({
    width: '45%',
    maxWidth: 500,
    height: 280,
    margin: '0 0 40px',
    textDecoration: 'none',
    color: '#FFF',
    
    '&:nth-of-type(2n)': { 
        marginLeft: '10%',
        [theme.breakpoints.down('sm')]: { marginLeft: 0 }
    },
    
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0 0 30px'
    }
}));

export const CardImage = styled('div')({
    position: 'relative',
    height: '83%',
    borderRadius: '2rem',
    overflow: 'hidden'
});

export const CardTitle = styled('p')(({ theme }) => ({
    margin: '1rem 0 0',
    fontSize: '1.2rem',
    textIndent: 10,
    
    [theme.breakpoints.down('md')]: { fontSize: '1rem' }
}));