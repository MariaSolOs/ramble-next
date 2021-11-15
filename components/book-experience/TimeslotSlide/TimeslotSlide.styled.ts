import React from 'react';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DateTitle = styled('time')(({ theme }) => ({
    margin: 0,
    fontSize: '1.3rem',
    textTransform: 'capitalize',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const YearTitle = styled('span')(({ theme }) => ({
    color: '#CBCBCB',
    fontSize: '1rem',
    marginLeft: 10,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const Slots = styled('div')(({ theme }) => ({
    width: '100%',
    minWidth: 340,
    maxHeight: 300,
    overflowY: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '1.5rem 0',
    
    [theme.breakpoints.down('sm')]: { 
        minWidth: 0,
        maxHeight: 'unset'
    }
}));

export const Slot = styled('button', {
    shouldForwardProp: prop => prop !== 'selected'
})<React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean; }>(({ theme, selected }) => ({
    width: '48%',
    height: 90,
    color: selected ? '#2B2B2B' : '#ECEBE5',
    backgroundColor: selected ? '#ECEBE5' : '#2A2A2A',
    border: 'none',
    marginBottom: '1.1rem',
    fontWeight: theme.typography.fontWeightBold,
    padding: 14,
    boxSizing: 'border-box',
    borderRadius: 14,
    transition: 'all 300ms ease-in-out',
    
    '&:nth-of-type(2n)': { marginLeft: '4%' },
    
    '&:disabled': {
        filter: 'brightness(70%)',
        cursor: 'not-allowed'
    },
    
    '&:hover:not(:disabled)': {
        color: '#2B2B2B',
        // TODO: Replace this with component selector
        '& .svg-inline--fa': { color: '#2B2B2B' },
        backgroundColor: '#ECEBE5'
    },

    ...selected && {
        // TODO: Replace this with component selector
        '.svg-inline--fa': { color: '#2B2B2B' }
    },
    
    [theme.breakpoints.down('sm')]: { padding: 8 }
}));

export const Icon = styled(FontAwesomeIcon)(({ theme }) => ({
    color: '#CBCBCB',
    marginRight: 8,
    fontSize: '1rem',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' }
}));

export const TimeslotText = styled('p')({
    margin: '0 0 14px',
    textAlign: 'left',
    fontSize: '1.1rem'
});

export const Meridiem = styled('span')({
    fontSize: '0.8rem',
    margin: '0 3px'
});

export const GuestsSlotText = styled('p')({
    textAlign: 'left',
    margin: 0,
    letterSpacing: '-0.05rem',
    fontSize: '0.8rem'
});