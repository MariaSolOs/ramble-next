import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled('div')(({ theme }) => ({
    width: '60vw',
    margin: '30vh auto 0',
    textAlign: 'center',
    
    [theme.breakpoints.down('md')]: {
        width: '80vw',
        margin: '150px auto 0'
    }
}));

export const Message = styled('p')(({ theme }) => ({
    fontSize: '1.1rem',
    fontWeight: theme.typography.fontWeightRegular
}));

export const StripeButton = styled(FontAwesomeIcon)({
    color: '#4379FF',
    fontSize: '5rem'
});