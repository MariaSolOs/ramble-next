import React from 'react';
import { styled } from '@mui/material/styles';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

export const Container = styled('div')(({ theme }) => ({
    paddingTop: 100,
    width: '100vw',
    height: '100%',
    backgroundColor: '#000',
    
    [theme.breakpoints.down('sm')]: { 
        paddingTop: 80,
        overflowY: 'scroll',
        height: 'auto',
        minHeight: '100%'
    }
}));

export const PageContent = styled('div')(({ theme }) => ({
    marginLeft: 80,
    overflowY: 'scroll',
    maxHeight: 'calc(100% - 10px)',
    
    [theme.breakpoints.down('md')]: { marginLeft: 50 },
    [theme.breakpoints.down('sm')]: {
        margin: '0 auto 60px',
        width: '95vw'
    }
}));

export const Navbar = styled('ul')({
    listStyle: 'none',
    padding: 0,
    width: 'fit-content',
    margin: '0 20px'
});

export const NavLink = styled('li', {
    shouldForwardProp: prop => prop !== 'disabled'
})<React.HTMLAttributes<HTMLLIElement> & { disabled: boolean; }>(({ theme, disabled }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    margin: '0 0 8px',
    textIndent: 30,
    whiteSpace: 'nowrap',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    
    [theme.breakpoints.down('sm')]: { 
        fontSize: '1rem',
        margin: '0 0 10px' 
    }
}));

export const NavbarDrawer = styled(Drawer)({
    '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        color: '#FFF',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
    },
    
    '& .MuiBackdrop-root': { backdropFilter: 'blur(5px)' }
});
    
export const Footer = styled('footer')({
    backgroundColor: '#1C1C1C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 49,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
    padding: '0 10px'
});

export const NavbarToggler = styled('div')({
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#757575',
    color: '#FFF',
    cursor: 'pointer',
    padding: '3px 3px 0',
    boxSizing: 'border-box'
});

export const FooterButton = styled(Box)(({ theme }) => ({
    borderRadius: 8,
    height: 35,
    minWidth: 90,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.05rem',
    color: '#FFF',
    border: 'none',

    '&:disabled': { filter: 'brightness(40%)' },
    
    [theme.breakpoints.down('sm')]: { 
        height: 35,
        minWidth: 75,
        fontSize: 12
    }
}));
