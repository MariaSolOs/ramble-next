import { styled } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';

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

export const GradientLine = styled(Box, {
    shouldForwardProp: prop => prop !== 'insideGraph'
})<BoxProps & { insideGraph?: boolean; }>(({ theme, insideGraph }) => ({
    padding: 3,
    marginTop: -6,
    borderRadius: '1rem',
    background: 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)',

    // For the title's underline
    ...!insideGraph && {
        [theme.breakpoints.down('sm')]: { 
            padding: 2,
            marginTop: -3
        }
    },

    ...insideGraph && {
        width: '75%',
        position: 'absolute',
        top: 33,
        left: '12%',
        zIndex: -1
    }
}));

export const Graph = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30
});

export const GraphItem = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
    color: '#808080',
    transition: 'color 300ms ease-in-out',
    
    '&:hover': { color: '#E6E6E6' },
    
    [theme.breakpoints.down('sm')]: { width: '30%' }
}));

export const GraphCircle = styled('div')({
    backgroundColor: 'whitesmoke',
    borderRadius: '50%',
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export const GraphText = styled('p')(({ theme }) => ({
    textAlign: 'center',
    fontSize: '1.1rem',
    lineHeight: 1.2,
    
    [theme.breakpoints.down('md')]: { fontSize: '0.9rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '0.75rem' }
}));
