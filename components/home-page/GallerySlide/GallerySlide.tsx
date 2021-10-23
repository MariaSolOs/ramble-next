import { v4 as uuid } from 'uuid';

import type { GallerySlideProps } from './index';

import Box from '@mui/material/Box';
import Image from 'next/image';
import * as S from './GallerySlide.styled';

const GallerySlide = (props: GallerySlideProps) => {
    return (
        <S.Slide>
            <Box sx={{ textAlign: props.titlesAlign }}>
                <S.Title>{props.title}</S.Title>
                <S.Subtitle>{props.subtitle}</S.Subtitle>
            </Box>
            <S.ImagesContainer>
                {props.images.map(({ src, placeholder }) => 
                    <S.Image key={uuid()}>
                        <Image
                        src={src}
                        width={250}
                        height={350}
                        placeholder="blur"
                        blurDataURL={placeholder}
                        alt="Experience preview" />
                    </S.Image>
                )}
            </S.ImagesContainer>
        </S.Slide>
    );
}

export default GallerySlide;