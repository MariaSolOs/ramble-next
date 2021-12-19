import { styled } from '@mui/material/styles';

import ExperienceCard from 'components/ExperienceCard';

export const Title = styled('h4')(({ theme }) => ({
    color: '#ACACAC',
    fontSize: '1.15rem',
    marginBottom: 8,
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const CardsRow = styled('div')({
    display: 'flex', 
    alignItems: 'center',
    overflowX: 'scroll',
    overflowY: 'hidden'
});

export const Card = styled(ExperienceCard)(({ theme }) => ({
    width: 220,
    height: 285,
    margin: '0 15px 0 0',
    flexShrink: 0,
    
    [theme.breakpoints.down('sm')]: { 
        width: '46.25vw',
        maxWidth: 220,
        margin: '0 2.5vw 0 0'
    }
}));
