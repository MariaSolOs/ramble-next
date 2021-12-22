import React from 'react';

import type { GradientButtonProps } from './index';

import NavLink from 'components/NavLink';
import * as S from './GradientButton.styled';

const GradientButton: React.FC<GradientButtonProps> = (props) => {
    const { link, ...buttonProps } = props;

    const button = <S.Button { ...buttonProps }>{props.children}</S.Button>;

    if (link) {
        return <NavLink { ...link } linkComponent={S.Link}>{button}</NavLink>;
    } else {
        return button;
    }
}

export default GradientButton;