import React from 'react';
import { styled } from '@mui/material/styles';

import type { Language } from 'models/translation';

export const GridContainer = styled('div')({ 
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100
});

export const Grid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 5rem)',
    gridTemplateRows: 'repeat(4, 5rem)',
    gridGap: '0.2rem',
    
    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(6, 4.5rem)',
        gridTemplateRows: 'repeat(4, 4.5rem)',
    },
    
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(6, 15vw)',
        gridTemplateRows: 'repeat(4, 15vw)',
        gridGap: '1vw'
    }
}));

export const GridItem = styled('figure')(({ theme }) => ({
    margin: 0,

    '&.grid-item-1': {
        gridColumnStart: 4,
        gridColumnEnd: 5,
        gridRowStart: 2,
        gridRowEnd: 5
    },

    '&.grid-item-2': {
        gridColumnStart: 1,
        gridColumnEnd: 4,
        gridRowStart: 4,
        gridRowEnd: 4
    },

    '&.grid-item-3': {
        gridColumnStart: 1,
        gridColumnEnd: 4,
        gridRowStart: 1,
        gridRowEnd: 4
    },

    '&.grid-item-4': {
        gridColumnStart: 5,
        gridColumnEnd: 7,
        gridRowStart: 2,
        gridRowEnd: 5
    },

    '&.grid-item-5': {
        gridColumnStart: 4,
        gridColumnEnd: 7,
        gridRowStart: 1,
        gridRowEnd: 2,

        [theme.breakpoints.down('md')]: { display: 'none' }
    }
}));

export const GridImage = styled('div')({
    width: '100%',
    height: '100%',
    display: 'block',
    borderRadius: '0.6rem',
    position: 'relative',
    overflow: 'hidden'
});

export const TitleFigure = styled('figure')(({ theme }) => ({
    display: 'none',
    
    [theme.breakpoints.down('md')]: {
        display: 'block',
        margin: 0,
        gridColumnStart: 4,
        gridColumnEnd: 7,
        gridRowStart: 1,
        gridRowEnd: 2
    }
}));

export const GridTitle = styled('h5', {
    shouldForwardProp: prop => prop !== 'language'
})<React.HTMLAttributes<HTMLHeadingElement> & { language: Language; }>(({ theme, language }) => ({
    fontSize: language === 'en' ? '1.5rem' : '1.3rem',
    minWidth: 143,
    margin: '10px 0 0 10px',
    lineHeight: 1.2,
    fontFamily: theme.typography.questrial.fontFamily,
    WebkitTextStroke: '0.5px #FFF',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down(450)]: {
        fontSize: language === 'en' ? '1.2rem' : '1.1rem',
        margin: '0 0 0 5px'
    },
    [theme.breakpoints.down(380)]: { fontSize: language === 'en' ? '1.1rem' : '1rem' },
    [theme.breakpoints.down(330)]: { fontSize: language === 'en' ? '1rem' : '0.9rem' }
}));

export const Title = styled('h2')(({ theme }) => ({
    fontSize: '2.5rem',
    marginLeft: 20,
    alignSelf: 'center',
    fontFamily: theme.typography.questrial.fontFamily,
    WebkitTextStroke: '0.6px #FFF',
    WebkitTextFillColor: 'transparent',
    width: 350,
    
    [theme.breakpoints.down('md')]: { display: 'none' }
}));

export const FilledTitle = styled('span')({ WebkitTextFillColor: '#FFF' });
