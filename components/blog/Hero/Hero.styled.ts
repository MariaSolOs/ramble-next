import { styled } from '@mui/material/styles';

import Image from 'next/image';

export const Hero = styled('div')(({ theme }) => ({
    width: '100vw',
    position: 'relative',
    height: '55vh',
    maxHeight: 430,
    
    [theme.breakpoints.down('sm')]: { height: '40vh' }
}));

export const HeroImage = styled(Image)({ filter: 'grayscale(0.5) !important' });

export const Title = styled('h3')(({ theme }) => ({
    position: 'absolute',
    top: '35%',
    fontSize: '2.4rem',
    width: '100%',
    textAlign: 'center',
    
    [theme.breakpoints.down('md')]: { fontSize: '2.1rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1.7rem' }
}));
