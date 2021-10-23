import { styled } from '@mui/material/styles';

import ExperienceCard from 'components/ExperienceCard';
import GradientButton from 'components/GradientButton';

export const Divider = styled('div')(({ theme }) => ({
    backgroundColor: '#FFF',
    padding: '5px 0',
    width: 150,
    margin: '40px auto',
    borderRadius: '2rem',
    
    [theme.breakpoints.down('md')]: { 
        width: 100,
        margin: '30px auto' 
    }
}));

export const Container = styled('div')(({ theme }) => ({
    margin: '0 auto',
    width: 'calc(4 * 245px)',

    [theme.breakpoints.down('md')]: { width: 'calc(2 * 245px)' },

    [theme.breakpoints.down('sm')]: { width: '100vw' }
}));

export const Cards = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',

    [theme.breakpoints.down('md')]: { flexWrap: 'wrap' }
}));

export const Card = styled(ExperienceCard)(({ theme }) => ({
    width: 220,
    height: 275,
    margin: '0 12.5px 0',

    [theme.breakpoints.down('md')]: { marginTop: 25 },

    [theme.breakpoints.down('sm')]: { 
        width: '47vw',
        margin: '3vw 1.5vw 0'
    }
}));

export const Title = styled('h3')(({ theme }) => ({
    margin: '15px 0 15px 12.5px',
    fontSize: '1.5rem',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
}));

export const SearchButton = styled(GradientButton)({
    width: 150,
    height: 40,
    textTransform: 'uppercase',
    display: 'block',
    margin: '50px auto 35px'
});
