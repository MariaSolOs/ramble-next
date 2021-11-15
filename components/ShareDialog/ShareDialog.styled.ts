import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: '#161616',
        borderRadius: '1.1rem'
    }
});

export const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 24px 0',
    
    [theme.breakpoints.down('sm')]: { padding: '15px 15px 0' }
}));

export const Title = styled('h4')(({ theme }) => ({
    fontSize: '1.2rem',
    color: '#FFF',
    margin: 0,
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const Content = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    
    [theme.breakpoints.down('sm')]: { padding: '8px 15px' }
}));

export const Button = styled(Box)(({ theme }) => ({
    backgroundColor: '#2A2A2A',
    color: '#CCC', 
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.05rem',
    fontSize: '0.9rem',
    border: 'none',
    width: '48%',
    height: 45,
    margin: '10px 0',
    borderRadius: '0.6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
}));

export const MediaIcon = styled('div')({ marginRight: 5 });

export const ShareLink = styled('span')(({ theme }) => ({
    maxWidth: 'calc(65% - 14px)',
    overflowX: 'hidden',
    fontWeight: theme.typography.fontWeightRegular,
    whiteSpace: 'nowrap'
}));

export const CopyButton = styled('button')(({ theme }) => ({
    border: 'none',
    backgroundColor: '#656565',
    color: '#FFF',
    borderRadius: '0.6rem',
    height: '80%',
    width: '22%',
    margin: '0 0 0 auto',
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.04rem',
    fontSize: '0.85rem',
    
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
        minWidth: 65
    }
}));