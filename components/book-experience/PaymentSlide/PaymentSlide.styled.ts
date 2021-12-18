import { styled } from '@mui/material/styles';
import type { StripeElementStyle } from '@stripe/stripe-js';

import Box from '@mui/material/Box';

export const DateTitle = styled('time')(({ theme }) => ({
    fontSize: '1.3rem',
    margin: 0,
    textTransform: 'capitalize',
    display: 'block',
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' }
}));

export const TimeslotTitle = styled('time')(({ theme }) => ({
    fontSize: '1.1rem',
    color: '#CBCBCB',
    margin: 0,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.95rem' }
}));

export const Divisor = styled('div')({
    backgroundColor: '#CBCBCB',
    padding: '0.5px 0',
    margin: '1rem auto 0',
    width: 70
});

export const PriceRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-between'
});

export const PriceWhiteText = styled('p')({
    fontSize: '1rem',
    margin: 0
});

export const PriceGreyText = styled('p')({
    color: '#CBCBCB',
    fontSize: '0.85rem',
    margin: 0
});

export const Input = styled(Box)(({ theme }) => ({
    marginTop: '1rem',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 39,
    width: '100%',
    
    '& ::placeholder': {
        opacity: 1,
        color: '#CBCBCB'
    },
    
    '&.Mui-error': { color: theme.palette.error.main }
}));

export const CardInfoRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    
    [`& ${Input}`]: { width: '31%' }
});

export const EmailMessage = styled('p')({
    margin: '8px 0 0 3px',
    fontSize: '0.8rem',
    color: '#CBCBCB'
});

export const stripeStyles: StripeElementStyle = {
    base: {
        fontFamily: 'Helvetica, sans-serif',
        backgroundColor: '#FFF',
        color: '#2A2A2A',
        fontSize: '16px',
        letterSpacing: '-0.8px',

        '::placeholder': {
            color: '#CBCBCB'
        }
    },

    invalid: { color: '#D8246E' }
}