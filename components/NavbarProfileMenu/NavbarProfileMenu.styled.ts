import React from 'react';
import { styled } from '@mui/material/styles';
import type { MenuProps } from '@mui/material/Menu';

import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiLanguageIcon from '@mui/icons-material/Language';

export const Button = styled('button', {
    shouldForwardProp: prop => prop !== 'isCreator'
})<React.ButtonHTMLAttributes<HTMLButtonElement> & { isCreator: boolean; }>(({ theme, isCreator }) => ({
    height: 45,
    padding: '4px 3px 3px',
    backgroundColor: isCreator ? '#FFF' : 'rgba(65, 65, 65, 0.9)',
    border: isCreator ? 'solid 1px black' : 'none',
    borderRadius: '1.5rem',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: { height: 40 }
}));

export const UserName = styled('span', {
    shouldForwardProp: prop => prop !== 'isCreator'
})<React.HTMLAttributes<HTMLSpanElement> & { isCreator: boolean; }>(({ theme, isCreator }) => ({
    color: isCreator ? '#000' : '#E8E8E8',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1rem',
    letterSpacing: '-0.06rem',
    margin: '0 0.5rem',

    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const Menu = styled(MuiMenu, {
    shouldForwardProp: prop => prop !== 'isCreator'
})<MenuProps & { isCreator: boolean; }>(({ isCreator }) => ({
    '& .MuiMenu-paper': {
        backgroundColor: isCreator ? '#FFF' : 'rgba(65, 65, 65, 0.9)',
        borderRadius: '1rem',
        marginTop: '0.4rem',
        padding: '0 4px'
    },

    '& .MuiMenuItem-root:hover, & .MuiMenuItem-root.active-link': {
        backgroundColor: isCreator ? 'rgba(220, 220, 220, 0.96)' : 'rgba(118, 118, 118, 0.96)',
        color: isCreator ? '#000' : '#E8E8E8',
        transition: 'all 0.3s ease-in-out'
    }
}));

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    textAlign: 'center',
    justifyContent: 'center',
    padding: '4px 20px',
    borderRadius: '0.65rem',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '0.9rem',

    '&.MuiMenuItem-root': {
        marginBottom: 3,
        minHeight: 40
    },

    '& a': {
        textDecoration: 'none',
        color: 'inherit'
    },

    '&:last-child': { margin: 0 }
}));

export const LanguageIcon = styled(MuiLanguageIcon)({
    marginRight: 3,
    color: '#616161',
    fontSize: '1.4rem'
});