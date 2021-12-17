import { styled } from '@mui/material/styles';

import BaseTextField from 'components/TextField';
import { Subtitle as BaseSubtitle } from 'components/experience-builder/slides/Shared.styled';

export { Title } from 'components/experience-builder/slides/Shared.styled';

export const Container = styled('div')(({ theme }) => ({
    maxWidth: 700,
    
    [theme.breakpoints.down('lg')]: { maxWidth: 600 },
    [theme.breakpoints.down('md')]: { maxWidth: 540 },
    [theme.breakpoints.down('sm')]: { width: '100%' }
}));

export const Subtitle = styled(BaseSubtitle)(({ theme }) => ({
    fontSize: '1.3rem',
    margin: '10px 0 30px',
    
    [theme.breakpoints.down('md')]: { fontSize: '1.1rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const TextField = styled(BaseTextField)({
    '& .MuiInputAdornment-root': {
        position: 'absolute',
        bottom: 20,
        right: 15
    },

    '& .MuiOutlinedInput-input': { padding: '0 25px 15px 0' },
    
    '& .MuiInputBase-input': { width: 'calc(100% - 30px)' }
});
