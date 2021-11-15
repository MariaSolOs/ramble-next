import { styled } from '@mui/material/styles';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import StarRateIcon from '@mui/icons-material/StarRate';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Card = styled('div')({
    borderRadius: '1.5rem',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    
    '&:hover': {
        transform: 'scale(1.03)',
        transition: 'transform 0.5s'
    }
});

export const Link = styled('a')({ textDecoration: 'none' });

export const Image = styled('div')({
    position: 'relative',
    height: '60%',
    width: '100%'
});

export const OnlineBadge = styled('div')({
    position: 'absolute',
    top: 10, 
    left: 10,
    whiteSpace: 'nowrap',
    color: '#2D2E2E',
    backgroundColor: 'rgba(256, 256, 256, 0.56)',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.45rem',
    textTransform: 'uppercase',
    letterSpacing: 0,
    padding: '0 3px',
    zIndex: 1
});

export const Body = styled('div')(({ theme }) => ({
    backgroundColor: '#2D2E2E',
    letterSpacing: '-0.02rem',
    color: '#ECEBE5',
    height: 'calc(40% + 5px)',
    padding: '5px 10px 10px',
    
    [theme.breakpoints.down('sm')]: { padding: '5px 10px' }
}));

export const Title = styled('p')(({ theme }) => ({
    fontSize: '0.9rem',
    margin: 0,
    textAlign: 'left',
    overflowWrap: 'break-word',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
}));

export const Location = styled('p')(({ theme }) => ({
    margin: 0,
    fontSize: '0.75rem',
    fontWeight: theme.typography.fontWeightRegular,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.7rem' }
}));

export const Rating = styled('p')(({ theme }) => ({
    margin: 0,
    display: 'inline-flex',
    alignItems: 'center',

    [theme.breakpoints.down(380)]: { display: 'none' }
}));

export const StarIcon = styled(StarRateIcon)({
    width: '1rem',
    height: '1rem',
    marginLeft: 5
});

export const PriceInfo = styled('p', {
    shouldForwardProp: prop => prop !== 'hasRatingInfo'
})<React.ParamHTMLAttributes<HTMLParagraphElement> & { hasRatingInfo: boolean; }>(({ theme, hasRatingInfo }) => ({
    fontSize: '0.7rem',
    margin: hasRatingInfo ? '-12px 0 0' : 0,
    textAlign: 'end',
    
    [theme.breakpoints.down(380)]: { 
        fontSize: '0.55rem',
        marginTop: hasRatingInfo ? 'auto' : 0
    }
}));

export const Price = styled('span')(({ theme }) => ({
    fontSize: '1.1rem',
    letterSpacing: '-0.02rem',
    
    [theme.breakpoints.down(380)]: { fontSize: '0.9rem' }
}));

export const HeartFab = styled(Fab)({
    position: 'absolute',
    top: 10, 
    right: 10,
    height: 36, 
    width: 36,
    backgroundColor: 'rgba(256, 256, 256, 0.56)',
    zIndex: 1
});

export const HeartIcon = styled(FontAwesomeIcon, {
    shouldForwardProp: prop => prop !== 'isSaved'
})<FontAwesomeIconProps & { isSaved: boolean; }>(({ isSaved }) => ({
    color: isSaved ? '#FE4164' : '#FFF',
    fontSize: '1.25rem'
}));