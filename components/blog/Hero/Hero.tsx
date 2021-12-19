import type { HeroProps } from './index';

import * as S from './Hero.styled';

const Hero = (props: HeroProps) => (
    <S.Hero>
        <S.HeroImage
        alt={props.title}
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        { ...props.imageProps } />
        <S.Title>{props.title}</S.Title>
    </S.Hero>
);

export default Hero;