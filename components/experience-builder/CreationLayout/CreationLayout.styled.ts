import React from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';

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

export const Footer = styled('footer')({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    width: '100%',
    zIndex: 1
});
    
export const FooterButtons = styled('div')({
    backgroundColor: '#1C1C1C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 'calc(100% - 6px)'
});

const FooterButton = styled(Box)(({ theme }) => ({
    borderRadius: 8,
    height: 35,
    minWidth: 90,
    fontSize: 14,
    
    [theme.breakpoints.down('sm')]: { 
        height: 35,
        minWidth: 75,
        fontSize: 12
    }
}));

export const NextButton = styled(FooterButton)({
    margin: '0 10px',

    '&:disabled': { filter: 'brightness(40%)' }
});

export const BackButton = styled(FooterButton)(({ theme }) => ({
    background: 'radial-gradient(circle at 96%, #2E2E2E, #6F6F6F)',
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.05rem',
    color: '#FFF',
    border: 'none'
}));

export const Progress = styled(LinearProgress)(({ value }) => ({
    height: 6,

    '& .MuiLinearProgress-barColorPrimary': {
        background: `linear-gradient(to right, #2BB282 ${100 - value!}%, #2D73EA 100%)`,
        borderRadius: '1rem'
    },

    '&.MuiLinearProgress-colorPrimary': { backgroundColor: 'transparent' }
}));

export const Navbar = styled('nav')({
    listStyle: 'none',
    padding: 0,
    width: 'fit-content',
    margin: '0 20px'
});

export const NavLink = styled('li', {
    shouldForwardProp: prop => prop !== 'inactive'
})<React.HTMLAttributes<HTMLLIElement> & { inactive: boolean; }>(({ theme, inactive }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
    margin: '0 0 8px',
    textIndent: 30,
    cursor: inactive ? 'default' : 'pointer',
    opacity: inactive ? 0.55 : 1,
    whiteSpace: 'nowrap',
    
    [theme.breakpoints.down('sm')]: { 
        fontSize: '1rem',
        margin: '0 0 10px' 
    }
}));

export const CheckIconContainer = styled('div')({
    background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: '50%'
});

export const NavbarToggler = styled('div')({
    margin: '0 auto 0 10px',
    borderRadius: 4,
    backgroundColor: '#757575',
    color: '#FFF',
    cursor: 'pointer',
    padding: '3px 3px 0',
    boxSizing: 'border-box'
});

export const NavbarDrawer = styled(Drawer)({
    '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        color: '#FFF',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)'
    },
    
    '& .MuiBackdrop-root': { backdropFilter: 'blur(5px)' }
});

export const PageContent = styled('div')(({ theme }) => ({
    marginLeft: 80,
    maxHeight: 'calc(100% - 10px)',
    
    [theme.breakpoints.down('md')]: { marginLeft: 50 },
    [theme.breakpoints.down('sm')]: {
        margin: '0 auto 60px',
        width: '95vw'
    }
}));