import React from 'react';

import GradientButton from './GradientButton';

export type GradientButtonProps = {
    variant: 'experience' | 'creator' | 'error';
    href?: string;
    as?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default GradientButton;
