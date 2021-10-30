import { useSession } from 'next-auth/client';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import type { LandingProps } from './index';

import Image from 'next/image';
import * as S from './Landing.styled';

const Landing = (props: LandingProps) => {
    const { BecomeACreator: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const [session] = useSession();

    const isLoggedIn = Boolean(session?.user.userId);
    const isCreator = Boolean(session?.user.creatorId);
    const link = isCreator ? routes.newExperience : routes.creatorForm;

    return (
        <S.Slide>
            <div>
                <S.Title>{text.becomeTitle}</S.Title>
                <S.Title>{text.shareTitle}</S.Title>
                <S.Title>{text.getPaidTitle}</S.Title>
                <S.Button 
                variant="creator"
                { ...isLoggedIn ? { link } : {
                    onClick: () => uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' })
                }}>
                    {text.getStarted}
                </S.Button>
            </div>
            <S.Image>
                <Image
                src={props.image.src}
                width={500}
                height={600}
                objectFit="cover"
                alt="Cooking with Sidney"
                placeholder="blur"
                blurDataURL={props.image.placeholder} />
            </S.Image>
        </S.Slide>
    );
}

export default Landing;