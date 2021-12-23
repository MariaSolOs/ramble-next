import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Card = styled('div')(({ theme }) => ({
    width: 380,
    minWidth: 380,
    height: '100%',
    margin: '0 20px',
    
    [theme.breakpoints.down('md')]: {
        width: '100%',
        margin: '0 auto 40px',
        maxWidth: 410,
        minWidth: 0,
        maxHeight: 450
    }
}));

export const GreyText = styled(Box)({
    color: '#ACACAC',
    fontSize: '0.95rem',
    margin: 0,
    display: 'block'
});

export const Icon = styled(FontAwesomeIcon)({
    color: '#ACACAC',
    fontSize: '1.1rem'
});

export const Private = styled('div')({
    position: 'absolute',
    top: 12,
    right: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '0.8rem',
    
    [`& ${Icon}`]: { color: '#FFF' }
});

export const Body = styled('div')(({ theme }) => ({
    backgroundColor: 'rgb(30, 30, 30)',
    borderRadius: '1.2rem',
    padding: 15,
    height: 'calc(100% - 68px - 1rem)',
    position: 'relative',
    
    [theme.breakpoints.down(380)]: { height: 'auto' }
}));

export const ClientInfo = styled('div')({
    display: 'flex',
    alignItems: 'center',
    
    [`& ${GreyText}`]: {
        fontSize: '0.85rem',
        marginLeft: 8
    }
});

export const InfoIcon = styled('div')({
    backgroundColor: '#2D2E2E',
    width: 28, 
    height: 28,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
});
    
export const InfoText = styled(Box)(({ theme }) => ({
    fontSize: '0.8rem',
    margin: 0,
    color: '#FFF',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.75rem' }
}));

export const LargeNum = styled('span')(({ theme }) => ({
    fontSize: '1.1rem',
    marginRight: 4,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.95rem' }
}));

export const InfoRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0'
});

export const ExperienceImgContainer = styled('div')({
    height: 75,
    width: 'auto',
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    position: 'relative',
    
    '& > div': { position: 'unset !important' },

    '& .next-image': {
        width: 'unset !important',
        height: '75px !important',
        position: 'unset !important'
    }
});

export const Actions = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2.5rem',
    
    [theme.breakpoints.down(380)]: { marginTop: 10 }
}));

export const Button = styled('button', {
    shouldForwardProp: prop => prop != 'variant'
})<React.HTMLAttributes<HTMLButtonElement> & { variant: 'accept' | 'decline'; }>(({ theme, variant }) => ({
    color: '#FFF',
    fontSize: '0.9rem',
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.05rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
    width: 80,
    height: 35,
    border: 'none',

    ...(variant === 'accept') && {
        backgroundColor: '#08E1AE',
        backgroundImage: 'linear-gradient(to right, #76B852 0%, #8DC26F 51%, #76B852 100%)',
        marginRight: '1rem'
    },

    ...(variant === 'decline') && {
        backgroundImage: 'linear-gradient(to right, #E53935 0%, #E35D5B 51%, #E53935 100%)'
    }
}));