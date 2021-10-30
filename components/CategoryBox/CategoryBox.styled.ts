import React from 'react';
import { styled } from '@mui/material/styles';

import type { IconLocation } from './index';

export const Box = styled('div', {
    shouldForwardProp: prop => (
        prop !== 'backgroundColor' && 
        prop !== 'backgroundImage' && 
        prop !== 'iconLocation'
    )
})<React.HTMLAttributes<HTMLDivElement> & { 
    backgroundColor: string; 
    backgroundImage: string; 
    iconLocation: IconLocation;
}>(({ backgroundColor, backgroundImage, iconLocation }) => ({
    borderRadius: '1rem',
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: iconLocation === 'top' ? 'column' : 'row',
    backgroundColor,
    backgroundImage
}));

export const Icon = styled('div', {
    shouldForwardProp: prop => prop !== 'iconLocation'
})<React.HTMLAttributes<HTMLDivElement> & { iconLocation: IconLocation; }>(({ iconLocation }) => ({
    width: 25, 
    height: 25,
    marginRight: iconLocation === 'left' ? 4 : 0
}));

export const Title = styled('span')({
    textAlign: 'center'
});