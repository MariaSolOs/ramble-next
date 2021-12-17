import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

import { CSSTransition } from 'react-transition-group';

const colorBlur = keyframes`
    0% {  
        transform: translate(0);
        text-shadow: 0 0 0 #0C2FFB, 
                     0 0 0 #2CFCFD,
                     0 0 0 #FB203B,
                     0 0 0 #FEFC4B;
    }

    30% {  
        transform: translate(-8px, -8px);
        text-shadow: 0 0.125em 0 #0C2FFB,
                     0 0.25em 0 #2CFCFD,
                     0 -0.125em 0 #FB203B,
                     0 -0.25em 0 #FEFC4B;
    }

    60% {  
        transform: translate(8px, 8px);
        text-shadow: 0 -0.0625em 0 #0C2FFB,
                     0 -0.125em 0 #2CFCFD,
                     0 0.0625em 0 #FB203B,
                     0 0.125em 0 #FEFC4B;
    }

    90% {  
        transform: translate(0);
        text-shadow: 0 0 0 #0C2FFB,
                     0 0 0 #2CFCFD,
                     0 0 0 #FB203B,
                     0 0 0 #FEFC4B;
    }
`;

export const Transition = styled(CSSTransition)({
    '&.fade-exit': { opacity: 1 },

    '&.fade-exit-active': {
        opacity: 0,
        transition: 'all 1s ease-out'
    }
});

export const Container = styled('div')({
    textAlign: 'left',
    width: '100vw',
    height: '100%',
    backgroundColor: '#000',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
});

export const Title = styled('h2')(({ theme }) => ({
    fontSize: '2.7rem',
    color: '#E6E6E6',
    animation: `${colorBlur} 1.3s ease-in-out`,
    margin: '0 auto 35px',
    width: '70%',
    
    [theme.breakpoints.down('md')]: { fontSize: '2.1rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1.7rem' }
}));
