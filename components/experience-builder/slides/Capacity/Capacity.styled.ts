import { styled } from '@mui/material/styles';

import BaseTip from 'components/Tip';
import PlusMinusInput from 'components/PlusMinusInput';

export * from 'components/experience-builder/slides/Shared.styled';

export const Tip = styled(BaseTip)({
    maxWidth: 650,
    marginTop: 20
});

export const CapacityField = styled(PlusMinusInput)(({ theme }) => ({
    width: '50%',
    [theme.breakpoints.down('md')]: { 
        width: '80%',
        minWidth: 250
    }
}));