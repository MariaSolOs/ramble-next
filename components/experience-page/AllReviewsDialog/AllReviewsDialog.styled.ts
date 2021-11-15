import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import MuiCloseIcon from '@mui/icons-material/Close';
import MuiRating from '@mui/material/Rating';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        color: '#FFF',
        borderRadius: '1rem',
        padding: '1.3rem 1.1rem 1.1rem'
    }
});

export const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    
    [theme.breakpoints.down('sm')]: { marginBottom: 0 }
}));

export const Title = styled('h3')(({ theme }) => ({
    margin: 0,
    fontSize: '1.3rem',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('sm')]: { fontSize: '1.15rem' }
}));

export const CloseIcon = styled(MuiCloseIcon)(({ theme }) => ({
    color: '#656565',
    cursor: 'pointer',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const ReviewTitle = styled('h4')({
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    margin: 0
});

export const Rating = styled(MuiRating)(({ theme }) => ({
    color: '#FFF',
    marginLeft: '1.5rem',
    
    '& .MuiRating-iconEmpty': { stroke: '#FFF' },
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const ReviewText = styled('p')({
    color: '#C8C8C8',
    fontSize: '0.95rem',
    margin: '5px 0 1rem'
});