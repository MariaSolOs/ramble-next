import React from 'react';

import useLanguageContext from 'context/languageContext';
import type { ExperienceCardProps } from './index';

import Link from 'next/link';
import Image from 'next/image';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import onlineIcon from 'public/images/online-experience-icon.svg';
import * as S from './ExperienceCard.styled';

const ExperienceCard = (props: ExperienceCardProps) => {
    const { appText, language } = useLanguageContext(); 
    const { ExperienceCard: text } = appText; 
    
    // Use the first image for the card
    const image = props.experience.images[0];
    const hasRatingInfo = Boolean(props.experience.ratingValue);
    const priceText = props.experience.isOnlineExperience ? text.perConnection : text.perPerson;

    return (
        <S.Card className={props.className}>
            {props.isSaved !== undefined &&
                <S.HeartFab disableRipple onClick={props.onHeartClick!}>
                    <S.HeartIcon icon={faHeart} isSaved={props.isSaved} />
                </S.HeartFab>}
            <Link { ...props.linkTo } passHref>
                <S.Link>
                    {props.experience.isOnlineExperience && 
                        <S.OnlineBadge sx={{ minWidth: language === 'en' ? 7.5 : 8 }}>
                            <Image
                            src={onlineIcon}
                            alt={text.online}
                            width={20}
                            height={20} />
                            {text.online}
                        </S.OnlineBadge>}
                    <S.Image>
                        <Image
                        src={image.src}
                        alt={props.experience.title}
                        placeholder="blur"
                        blurDataURL={image.placeholder}
                        layout="fill"
                        objectFit="cover" />
                    </S.Image>
                    <S.Body>
                        <S.Title>{props.experience.title}</S.Title>
                        <S.Location>{props.experience.location}</S.Location>
                        {hasRatingInfo &&
                            <S.Rating>
                                {props.experience.ratingValue!.toFixed(2)} 
                                <S.StarIcon />
                            </S.Rating>}
                        <S.PriceInfo hasRatingInfo={hasRatingInfo}>
                            <S.Price>${props.experience.pricePerPerson} </S.Price>
                            {priceText.toUpperCase()}
                        </S.PriceInfo>
                    </S.Body>
                </S.Link>
            </Link>
        </S.Card>
    );
}

export default React.memo(ExperienceCard, (prevProps, nextProps) => 
    prevProps.experience._id === nextProps.experience._id &&
    prevProps.isSaved === nextProps.isSaved
);