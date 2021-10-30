import { styled } from '@mui/material/styles';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = styled('footer')(({ theme }) => ({
    width: 'calc(300px * 3 - 12rem)',
    maxWidth: '100vw',
    margin: '0 auto 2rem 12rem',
    
    [theme.breakpoints.down('md')]: { margin: '0 auto 2rem 1rem' },
    [theme.breakpoints.down('sm')]: { 
        width: '98vw',
        margin: '0 auto 2rem 2vw'
    }
}));

export const Title = styled('h4')(({ theme }) => ({
    fontFamily: theme.typography.futura.fontFamily,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '2rem',
    letterSpacing: '-0.07rem',
    color: '#F6F6F6',
    margin: '0 auto 1.5rem 0',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.8rem' }
}));

export const BodyColumn = styled('div')(({ theme }) => ({
    width: '25%',
    
    [theme.breakpoints.down('md')]: { width: '22%' }
}));

export const ColumnTitle = styled('h5')(({ theme }) => ({
    fontSize: '1rem',
    letterSpacing: '-0.07rem',
    color: '#ECEBE5',
    margin: '0 0 0.7rem',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
}));

export const GreyText = styled(Box)(({ theme }) => ({
    color: '#C0BFBA',
    fontSize: '0.85rem',
    fontWeight: theme.typography.fontWeightRegular,
    textDecoration: 'none',

    [theme.breakpoints.down('sm')]: { fontSize: '0.7rem' }
}));

export const SupportLink = styled(GreyText)({
    cursor: 'pointer',
    transition: 'color 300ms',

    '&:hover': { color: '#FFF' }
});

export const MediaIcon = styled(FontAwesomeIcon, {
    shouldForwardProp: prop => prop !== 'media'
})<FontAwesomeIconProps & { media: 'facebook' | 'instagram'; }>(({ theme, media }) => ({
    color: '#C0BFBA',
    fontSize: '1.8rem',
    marginRight: 10,
    transition: 'all 300ms ease-in-out',

    ...(media === 'instagram') && { borderRadius: 10 },

    '&:hover': {
        color: media === 'facebook' ? '#3B579D' : '#FFF',
        ...(media === 'instagram') && { 
            backgroundImage: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
        }
    },

    [theme.breakpoints.down('sm')]: { fontSize: '1.4rem' }
}));

export const LanguageChip = styled(Chip)(({ theme }) => ({
    backgroundColor: 'rgba(65, 65, 65, 0.9) !important',
    color: '#FFF',
    letterSpacing: '-0.05rem',
    width: 'fit-content',
    padding: '3px 10px',
    marginRight: 10,
    
    [theme.breakpoints.down('sm')]: { padding: '3px 5px' }
}));