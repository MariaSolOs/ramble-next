import { styled } from '@mui/material/styles';

import GradientButton from 'components/GradientButton';

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
    fontWeight: theme.typography.fontWeightRegular,
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const Button = styled(GradientButton)({ width: 100 });