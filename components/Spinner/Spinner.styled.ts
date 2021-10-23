import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

import Box from '@mui/material/Box';

const bounce = keyframes`
    0%, 80%, 100% {
        transform: scale(0);
    }

    40% {
        transform: scale(1);
    }
`;

export const Backdrop = styled('div')({
    width: '100vw',
    height: '100%',
    position: 'fixed',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0,
    inset: 0
});

export const Ball = styled(Box)(({ theme }) => ({
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: '100%',
    display: 'inline-block',
    animation: `${bounce} 1.4s infinite ease-in-out both`,

    [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 40
    }
}));