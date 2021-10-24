import { styled } from '@mui/material/styles';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ExperienceCard from 'components/ExperienceCard';

export const Gallery = styled(TransitionGroup)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 'calc(265px * 4)',
    maxWidth: '80vw',
    margin: '0 auto 30px',
    
    [theme.breakpoints.down('lg')]: { 
        width: 'calc(265px * 3)',
        minWidth: 0
    },
    [theme.breakpoints.down('md')]: { 
        width: 'calc(265px * 2)',
        margin: '0 auto'
    },
    [theme.breakpoints.down('sm')]: { width: 265 }
}));

export const Transition = styled(CSSTransition)({
    transition: 'all 300ms ease-in',

    '&.card-fade-out': { opacity: 0 },
    '&.card-fade-in': { opacity: 1 }
});

export const Card = styled(ExperienceCard)(({ theme }) => ({
    width: 240,
    height: 290,
    margin: '25px 25px 0 0',
    
    [theme.breakpoints.down('sm')]: { 
        width: 255,
        height: 300,
        margin: '25px auto 0' 
    }
}));