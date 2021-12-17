import React from 'react';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export * from 'components/experience-builder/slides/Shared.styled';

export const TypeBoxes = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: 320,
    marginTop: 40,
    
    [theme.breakpoints.down('sm')]: { width: '100%' }
}));

export const TypeBox = styled('div', {
    shouldForwardProp: prop => prop !== 'selected'
})<React.HTMLAttributes<HTMLDivElement> & { selected: boolean; }>(({ theme, selected }) => ({
    cursor: 'pointer',
    color: selected ? '#2B2B2B' : '#ECEBE5', 
    backgroundColor: selected ? '#ECEBE5' : '#2A2A2A',
    width: 150,
    height: 190,
    transition: 'all 300ms ease-in-out',
    position: 'relative',
    fontSize: '0.95rem',
    padding: 14,
    boxSizing: 'border-box',
    borderRadius: 20,
    
    '&:hover': {
        backgroundColor: '#ECEBE5',
        color: '#2B2B2B'
    },
    
    [theme.breakpoints.down('sm')]: { width: '47%' }
}));

export const TypeBoxHeader = styled('div')({
    height: 30,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
});

export const OnlineIcon = styled(FontAwesomeIcon)({
    fontSize: '1.2rem',
    marginRight: 12
});

export const TypeBoxDivider = styled('div')({
    padding: '0.5px 0',
    backgroundColor: '#CECECE',
    width: '30%',
    position: 'absolute',
    top: 54,
    left: 0
});

export const TypeBoxMessage = styled('p')({ margin: '30px 0 0' });