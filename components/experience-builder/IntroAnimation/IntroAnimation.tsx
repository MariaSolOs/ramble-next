import { useRef } from 'react';
import useLanguageContext from 'context/languageContext';
import type { IntroAnimationProps } from './index';

import Div100vh from 'react-div-100vh';
import * as S from './IntroAnimation.styled';

const IntroAnimation = (props: IntroAnimationProps) => {
    const { CreateExperience: text } = useLanguageContext().appText;

    const titlesRef = useRef<HTMLDivElement>(null);

    return (
        <Div100vh>
            <S.Transition
            in={props.animationIn}
            timeout={1000}
            unmountOnExit
            nodeRef={titlesRef}
            classNames={{
                exit: 'fade-exit',
                exitActive: 'fade-exit-active'
            }}>
                <S.Container ref={titlesRef}>
                    <S.Title>{text.animationTitle1}</S.Title>
                    <S.Title>{text.animationTitle2}</S.Title>
                </S.Container>
            </S.Transition>
        </Div100vh>
    );
}

export default IntroAnimation;