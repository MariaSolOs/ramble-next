import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { NoExperiencesCardProps } from './index';

import Image from 'next/image';
import * as S from './NoExperiencesCard.styled';

const NoExperiencesCard = (props: NoExperiencesCardProps) => {
    const { NoExperiencesCard: text } = useLanguageContext().appText;

    return (
        <S.Card>
            <S.Avatar>
                <Image 
                src={props.creatorPhoto.src}
                alt={props.creatorName}
                width={90}
                height={90}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={props.creatorPhoto.placeholder} />
            </S.Avatar>
            <S.CreatorName>{props.creatorName}</S.CreatorName>
            <S.Message>{text.message}</S.Message>
            <S.Button variant="creator" link={routes.newExperience}>
                {text.button}
            </S.Button>
        </S.Card>
    );
}

export default NoExperiencesCard;