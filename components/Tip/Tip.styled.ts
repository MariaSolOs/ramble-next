import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Tip = styled('p')(({ theme }) => ({
    color: '#CDCDCD',
    fontSize: '0.95rem',
    fontWeight: theme.typography.fontWeightRegular
}));

export const Icon = styled(FontAwesomeIcon)({
    fontSize: '1.3rem',
    marginRight: '0.5rem'
});