import { styled } from '@mui/material/styles';
import type { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiChip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import MuiLanguageIcon from '@mui/icons-material/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ToggleIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    color: '#F6F6F6',
    height: '3rem',
    margin: '0 10px',

    [theme.breakpoints.down('sm')]: { height: '2rem' }
}));

export const Menu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiMenu-paper': {
        backgroundColor: 'rgba(65, 65, 65, 0.7)',
        borderRadius: '1rem',
        padding: '0 4px',

        '&.MuiPopover-paper': { 
            minWidth: 200,
            [theme.breakpoints.down('sm')]: { minWidth: 150 }
        }
    }
}));

export const MenuItem = styled(MuiMenuItem, {
    shouldForwardProp: prop => prop !== 'noHoverTransition'
})<MuiMenuItemProps & { noHoverTransition?: boolean; }>(({ theme, noHoverTransition }) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '0.9rem',
    letterSpacing: '-0.07rem',
    color: '#E8E8E8',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: '0.65rem',
    padding: 4,
    marginBottom: 4,

    '&:last-child': { margin: 0 },
    ...!noHoverTransition && {
        '&:hover': {
            backgroundColor: 'rgba(118, 118, 118, 0.96)',
            transition: 'all 0.3s ease-in-out'
        }
    },

    '& a': {
        textDecoration: 'none',
        color: '#E8E8E8'
    },

    [theme.breakpoints.down('sm')]: {
        height: 30,
        minHeight: 0
    }
}));

export const LanguageIcon = styled(MuiLanguageIcon)({
    marginRight: 3,
    color: '#616161',
    fontSize: '1.4rem'
});

export const LanguageChip = styled(MuiChip)({
    backgroundColor: 'rgba(65, 65, 65, 0.9) !important',
    color: '#FFF',
    letterSpacing: '-0.05rem',
    width: 'fit-content',
    marginRight: 10
});

export const ExpandedNav = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginRight: 10
});

export const ExpandedLink = styled(Box)(({ theme }) => ({
    padding: 8,
    fontSize: '1.05rem',
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.07rem',
    whiteSpace: 'nowrap',
    marginRight: 10,
    color: '#ACACAC',
    textDecoration: 'none',
    background: 'none',
    border: 'none'
}));