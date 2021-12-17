import { styled } from '@mui/material/styles';

import PlusMinusInput from 'components/PlusMinusInput';

export * from 'components/experience-builder/slides/Shared.styled';

export const Checkboxes = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 20
});

export const CheckboxField = styled('div')({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem'
});

export const GreyCaps = styled('label')(({ theme }) => ({
    color: '#CDCDCD',
    textTransform: 'uppercase',
    fontSize: '1rem',
    margin: '2rem 0 10px',
    display: 'inline-block',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const PlusMinus = styled(PlusMinusInput)(({ theme }) => ({
    width: 300,
    
    [theme.breakpoints.down('sm')]: { width: '100%' }
}));