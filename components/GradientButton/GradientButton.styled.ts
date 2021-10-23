import { styled } from '@mui/material/styles';

import type { GradientButtonVariant } from './index';

/**
 * @param variant - The button's variant
 * @returns The gradient to use for the background
 */
const getGradient = (variant: GradientButtonVariant) => {
    switch (variant) {
        case 'experience': 
            return 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)';
        case 'creator':
            return 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)';
        case 'error':
            return 'linear-gradient(to right, #1FA2FF 0%, #12D8FA 100%)';
        default:
            return '';
    }
}

export const Button = styled('button', {
    shouldForwardProp: prop => prop !== 'variant'
})<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant: GradientButtonVariant; }>(({ theme, variant }) => ({
    padding: '0.45rem 0.75rem',
    borderRadius: '2rem',
    border: 'none',
    background: getGradient(variant),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '0.9rem',
    letterSpacing: '-0.04rem',
    color: '#ECEBE5',

    '&:disabled': { 
        pointerEvents: 'none',
        filter: 'brightness(70%)'
    }
}));

export const Link = styled('a')({
    textDecoration: 'none',
    display: 'contents' 
});
