import { styled } from '@mui/material/styles';

import MuiCheckbox from '@mui/material/Checkbox';

export const Checkbox = styled(MuiCheckbox)({
    color: '#FFF',
    transition: 'all 200ms ease-in-out',
    padding: 5,
    
    '&:hover': { color: '#2F2F2F' },

    '&.Mui-checked': { color: '#FFF' }
});
