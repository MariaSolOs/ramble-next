import React from 'react';
import { useRouter } from 'next/router';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { LayoutProps } from './index';

import * as S from './Layout.styled';

const Layout: React.FC<LayoutProps> = (props) => {
    const { ExperienceDetails: text } = useLanguageContext().appText;
    const router = useRouter();

    return (
        <>
            <S.ExperienceContainer>{props.children}</S.ExperienceContainer>
            <S.Footer>
                <S.GoBackIcon onClick={router.back} />
                <S.PriceText>
                    <S.Price>${props.experiencePrice}</S.Price>
                    {props.isOnlineExperience ? text.perConnection : text.perPerson}
                </S.PriceText>
                <S.BookingButton 
                variant="experience" 
                link={routes.bookExperience(props.experienceId)}>
                    {text.bookExperience}
                </S.BookingButton>
            </S.Footer>
        </>
    );
}

export default Layout;