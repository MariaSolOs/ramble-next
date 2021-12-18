import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';

export * from 'components/experience-builder/slides/Shared.styled';

export const Checkboxes = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: 200,
    margin: '20px 0 40px',
    
    [theme.breakpoints.down('sm')]: { margin: '10px 0 20px' }
}));

export const CheckboxField = styled('div')({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem'
});

export const AddIcon = styled(AddCircleIcon)({
    fontSize: '3rem',
    color: '#808080',
    cursor: 'pointer',

    '&:hover': { 
        color: '#CDCDCD',
        transform: 'scale(1.05)',
        transition: 'transform 300ms ease-in-out'
    }
});

export const ErrorMessage = styled('p')(({ theme }) => ({
    color: theme.palette.error.main,
    letterSpacing: '-0.02rem',
    fontSize: '0.8rem',
    height: 18,
    margin: '10px 0'
}));

export const ChipList = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    width: 388,
    
    [theme.breakpoints.down('md')]: { width: '100%' }
}));