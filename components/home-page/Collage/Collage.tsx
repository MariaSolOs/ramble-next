import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { CollageProps } from './index';

import Image from 'next/image';
import * as S from './Collage.styled';

const Collage = (props: CollageProps) => {
    const { appText, language } = useLanguageContext();
    const { Home: text } = appText;

    const titleContents = (
        <>
            {text.experienceTitle1}
            <S.FilledTitle> {text.experienceTitle2}</S.FilledTitle>.
        </>
    );

    return (
        <S.GridContainer>
            <S.Grid>
                {props.images.map((img, idx) => 
                    <S.GridItem key={uuid()} className={`grid-item-${idx + 1}`}>
                        <S.GridImage>
                            <Image
                            src={img.src}
                            alt="Experience grid"
                            priority
                            placeholder="blur"
                            layout="fill"
                            objectFit="cover"
                            blurDataURL={img.placeholder} />
                        </S.GridImage>
                    </S.GridItem>
                )}
                <S.TitleFigure>
                    <S.GridTitle language={language}>{titleContents}</S.GridTitle>
                </S.TitleFigure>
            </S.Grid>
            <S.Title>{titleContents}</S.Title>
        </S.GridContainer>
    );
}

export default Collage;