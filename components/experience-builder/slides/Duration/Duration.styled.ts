import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import BaseTip from 'components/Tip';

export * from 'components/experience-builder/slides/Shared.styled';

export const Tip = styled(BaseTip)({ margin: '1rem 0 30px' });

export const TextField = styled(InputBase)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1rem',
    color: '#929293',
    backgroundColor: '#2A2A2A',
    width: '90%',
    padding: '10px 15px',
    height: 45,
    borderRadius: '2rem',
    
    '& .MuiInputBase-input': { textAlign: 'center' }
}));

export const FieldButtons = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '10%'
});

export const FieldButton = styled(Box)({
    color: '#2A2A2A',
    cursor: 'pointer',

    '&:hover': {
        color: '#FFF',
        transition: 'all 200ms ease-in-out'
    }
});