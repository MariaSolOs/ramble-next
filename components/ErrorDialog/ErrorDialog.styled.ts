import { styled } from '@mui/material/styles';

import MuiDialog from '@mui/material/Dialog';

export const Dialog = styled(MuiDialog)({
    '& .MuiDialog-paper': {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        borderRadius: '1.1rem',
        padding: 20
    }
});

export const Title = styled('h4')({
    fontSize: '1.1rem',
    color: '#FFF',
    margin: 0
});

export const Image = styled('div')({
    width: 70,
    height: 70,
    marginRight: 15
});

export const Message = styled('p')({
    fontSize: '1rem',
    color: '#DFDFDF',
    margin: '15px 0 0'
});
