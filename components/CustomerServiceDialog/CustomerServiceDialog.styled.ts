import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: 20
    }
});

export const Title = styled('h4')(({ theme }) => ({
    fontSize: '1.2rem',
    color: '#ECEBE5',
    margin: 0,

    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const GreyText = styled('p')(({ theme }) => ({
    color: '#C0BFBA',
    margin: '5px 0',
    fontSize: '1rem',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const ContactInfo = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

export const Icon = styled(FontAwesomeIcon)({
    color: '#C0BFBA',
    fontSize: '1.25rem',
    marginRight: '1rem'
});