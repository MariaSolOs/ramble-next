import React from 'react';

import type { GradientButtonProps } from './index';

import Link from 'next/link';
import * as S from './GradientButton.styled';

const GradientButton: React.FC<GradientButtonProps> = (props) => {
    const { link, ...buttonProps } = props;

    const button = <S.Button { ...buttonProps }>{props.children}</S.Button>;

    if (link) {
        return (
            <Link { ...link } passHref>
                <S.Link>{button}</S.Link>
            </Link>
        );
    } else {
        return button;
    }
}

export default GradientButton;