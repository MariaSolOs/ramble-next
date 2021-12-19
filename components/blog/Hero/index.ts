import type { ImageProps } from 'next/image';

import Hero from './Hero';

export type HeroProps = {
    imageProps: ImageProps;
    title: string;
}

export default Hero;