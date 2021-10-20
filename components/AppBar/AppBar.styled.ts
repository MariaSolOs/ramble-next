import { styled } from '@mui/material/styles';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import MuiAppBar from '@mui/material/AppBar';

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'isScrolled'
})<MuiAppBarProps & { isScrolled: boolean }>(({ theme, isScrolled }) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    opacity: 1,
    padding: '10px 0 0',
    transition: 'opacity 600ms',
    zIndex: 50,

    ...isScrolled && {
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 600ms'
    },

    [theme.breakpoints.down('xs')]: { 
        height: 71,
        '& .MuiToolbar-gutters': {
            paddingLeft: '2.5vw'
        }
    }
}));

export const Brand = styled('a')(({ theme }) => ({
    width: 150,

    [theme.breakpoints.down('xs')]: {
        width: 120,
        height: 34
    }
}));