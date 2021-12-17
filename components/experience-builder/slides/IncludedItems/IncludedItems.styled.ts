import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';

export * from 'components/experience-builder/slides/Shared.styled';

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

export const ErrorMsg = styled('p')({
    color: '#D8246E',
    letterSpacing: '-0.02rem',
    fontSize: '0.8rem',
    height: 18,
    margin: '10px 0'
});

export const ChipList = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    width: 388,
    
    [theme.breakpoints.down('md')]: { width: '100%' }
}));

//     chip: { margin: '0 10px 10px 0' }
// });
