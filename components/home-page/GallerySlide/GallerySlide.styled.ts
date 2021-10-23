import { styled } from '@mui/material/styles';

export const Slide = styled('div')({
    width: '85%',
    margin: '0 auto 10%'
});

export const Title = styled('h1')(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '2.6rem',
    letterSpacing: '-0.09rem',
    marginBottom: '0.4rem',
    
    [theme.breakpoints.down('lg')]: { fontSize: '2.4rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '2rem' }
}));

export const Subtitle = styled('h3')(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1.2rem',
    letterSpacing: '-0.07rem',
    color: '#E5E4E5',
    margin: '0 0 2rem'
}));

export const ImagesContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: '2rem',
    justifyContent: 'space-between',
    maxWidth: 840,
    margin: '0 auto',

    [theme.breakpoints.down('md')]: { justifyContent: 'center' }
}));

export const Image = styled('div')(({ theme }) => ({
    width: 250,
    height: 350,
    borderRadius: '1.3rem',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
        '&:nth-of-type(odd)': { display: 'none' }
    }
}));
