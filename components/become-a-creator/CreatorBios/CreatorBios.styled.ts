import { styled } from '@mui/material/styles';

import { CSSTransition } from 'react-transition-group';
import Box from '@mui/material/Box';

export const Title = styled('h1')(({ theme }) => ({
    color: '#E6E6E6',
    margin: 0,
    fontSize: '2.3rem',
    whiteSpace: 'nowrap',
    display: 'flex',
    
    [theme.breakpoints.down('md')]: { fontSize: '1.7rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' }
}));

export const Underlined = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0.55rem',
    
    [theme.breakpoints.down('sm')]: { marginLeft: '0.45rem' }
}));

export const GradientLine = styled('span')(({ theme }) => ({
    padding: 3,
    marginTop: -6,
    borderRadius: '1rem',
    background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)',

    [theme.breakpoints.down('sm')]: { 
        padding: 2,
        marginTop: -3
    }
}));

export const Transition = styled(CSSTransition)({
    '&.blur-enter': { opacity: 0 },

    '&.blur-enter-active': { 
        opacity: 1,
        transition: 'all 400ms ease-in'
    },

    '&.blur-exit': { display: 'none' }
});

export const CreatorCard = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '20px auto 0',
    width: '50%',
    height: 250,
    
    [theme.breakpoints.down('md')]: { width: '80%' }
}));

export const CreatorImage = styled('div')(({ theme }) => ({
    borderRadius: '100%',
    height: 150,
    width: 150,
    overflow: 'hidden',
    position: 'relative',

    [theme.breakpoints.down('md')]: {
        height: 110,
        width: 110
    }
}));

export const CreatorName = styled('h5')(({ theme }) => ({
    fontSize: '1.5rem',
    margin: '10px 0 5px 0',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' }
}));

export const CreatorBio = styled('p')(({ theme }) => ({
    fontFamily: theme.typography.futura.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    color: '#CCCCC6',
    fontSize: '1rem',
    margin: 0,
    lineHeight: 1.4,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' }
}));

export const BioArrow = styled(Box)({
    color: '#808080',
    fontSize: '3rem',
    transition: 'ease-in-out 300ms',

    '&:hover': {    
        color: '#FFF',
        cursor: 'pointer'
    }
});
