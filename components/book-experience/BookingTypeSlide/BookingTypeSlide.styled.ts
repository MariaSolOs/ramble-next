import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BookingButton = styled('button', {
    shouldForwardProp: prop => prop !== 'selected'
})<React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean; }>(({ theme, selected }) => ({
    color: '#ECEBE5',
    backgroundColor: selected ? '#ECEBE5' : '#2A2A2A',
    border: 'none',
    fontWeight: theme.typography.fontWeightBold,
    padding: '1rem',
    boxSizing: 'border-box',
    borderRadius: 14,
    transition: 'all 300ms ease-in-out',
    width: '100%',
    letterSpacing: '-0.05rem',
    marginBottom: 20,
    
    '&:hover': {
        // TODO: Replace this using components as selectors
        '& p': { color: '#2B2B2B' },
        backgroundColor: '#ECEBE5'
    },

    ...selected && {
        // TODO: Replace this using components as selectors
        '& p': { color: '#2B2B2B' }
    }
}));

export const ButtonTitle = styled('p')(({ theme }) => ({
    color: '#FFF',
    margin: 0,
    textAlign: 'left',
    fontSize: '1.2rem',
    display: 'flex',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' }
}));

export const ButtonText = styled('p')(({ theme }) => ({
    color: '#CBCBCB',
    margin: '8px 0 0',
    textAlign: 'left',
    fontSize: '0.95rem',
    
    '&:nth-of-type(3)': { fontSize: '0.8rem' },
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' }
}));

export const Icon = styled(FontAwesomeIcon)({
    marginRight: 8,
    fontSize: 14
});

export const Price = styled('span')({ marginLeft: 'auto' });