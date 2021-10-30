import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { CreatorBiosProps } from './index';

import { TransitionGroup } from 'react-transition-group';
import Box from '@mui/material/Box';
import Image from 'next/image';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import * as S from './CreatorBios.styled';

const CreatorBios = (props: CreatorBiosProps) => {
    const { appText, language } = useLanguageContext();
    const { BecomeACreator: text } = appText;

    const [slideIdx, setSlideIdx] = useState(0);
    const creator = props.bios[slideIdx];
    const biosLength = props.bios.length;

    return (
        <Box sx={{ m: '100px auto 0', width: { xs: '90vw', sm: '65vw' } }}>
            <S.Title>
                {text.currentCreators1}
                <S.Underlined>
                    {text.currentCreators2}
                    <S.GradientLine />
                </S.Underlined>
            </S.Title>
            <TransitionGroup>
                <S.Transition
                key={uuid()}
                unmountOnExit
                timeout={400}
                classNames={{
                    enter: 'blur-enter',
                    enterActive: 'blur-enter-active',
                    exitActive: 'blur-exit'
                }}>
                    <S.CreatorCard>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <S.BioArrow 
                            as={KeyboardArrowLeftIcon}
                            onClick={() => {
                                setSlideIdx((slideIdx + biosLength - 1) % biosLength)
                            }} />
                            <S.CreatorImage>
                                <Image
                                src={creator.image.src}
                                alt={creator.name}
                                placeholder="blur"
                                layout="fill"
                                objectFit="cover"
                                blurDataURL={creator.image.placeholder} />
                            </S.CreatorImage>
                            <S.BioArrow 
                            as={KeyboardArrowRightIcon}
                            onClick={() => {
                                setSlideIdx((slideIdx + 1) % biosLength)
                            }} />
                        </Box>
                        <S.CreatorName>{creator.name}</S.CreatorName>
                        <S.CreatorBio>{creator.bio[language]}</S.CreatorBio>
                    </S.CreatorCard>
                </S.Transition>
            </TransitionGroup>
        </Box>
    );
}

export default CreatorBios;