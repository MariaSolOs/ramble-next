import React, { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import type { ReactImageGalleryItem } from 'react-image-gallery';

import useLanguageContext from 'context/languageContext';
import { getFormattedDuration } from 'lib/date-time';
import { isOptimizedImage } from 'models/files';
import type { ExperienceProps, CarouselImgProps, QuickInfoProps } from './index';
import type { Theme } from './Experience.styled';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import type { CollapseProps } from '@mui/material/Collapse';
import Carousel from 'react-image-gallery';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import Box from '@mui/material/Box';
import StarRateIcon from '@mui/icons-material/StarRate';
import onlineIcon from 'public/images/online-experience-icon.svg';
import * as S from './Experience.styled';

import 'react-image-gallery/styles/css/image-gallery.css';

const CarouselItem = React.memo(function CarouselItem(props: ReactImageGalleryItem) {
    const item = props as CarouselImgProps;

    return (
        <div className="main-image-wrapper">
            <Image
            src={item.original}
            alt={item.alt}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={item.placeholder}
            className="main-image" />
        </div>
    );
});

const CarouselThumbnail = React.memo(function CarouselThumbnail(props: ReactImageGalleryItem) {
    const item = props as CarouselImgProps;

    return (
        <div className="thumbnail-wrapper">
            <Image
            src={item.thumbnail}
            alt={item.alt}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={item.placeholder}
            className="thumbnail" />
        </div>
    );
});

const QuickInfo = (props: QuickInfoProps) => (
    <S.QuickInfoColumn>
        <S.QuickInfoCircle>
            <S.QuickInfoIcon icon={props.icon} />
        </S.QuickInfoCircle>
        <S.QuickInfoLabel>{props.label}</S.QuickInfoLabel>
        <S.QuickInfoText>{props.content}</S.QuickInfoText>
    </S.QuickInfoColumn>
);

const Experience = (props: ExperienceProps) => {
    const { Experience: text } = useLanguageContext().appText;
    const { experience } = props;
    const { creator } = experience;
    const isAgeRestricted = Boolean(props.experience.ageRestriction);

    // Keep a ref of the reviews for focusing
    const reviewsRef = useRef<HTMLDivElement>(null);

    const [isBioExpanded, setIsBioExpanded] = useState(false);

    // Depending on the images we get, construct the carousel items
    const carouselItems = experience.images.map(img => {
        if (isOptimizedImage(img)) {
            const item: CarouselImgProps = {
                original: img.src,
                thumbnail: img.src,
                placeholder: img.placeholder,
                alt: experience.title
            }
            return item;
        } else { // The image is a string
            const item: ReactImageGalleryItem = {
                original: img,
                thumbnail: img
            }   
            return item;
        }
    });

    return (
        <ThemeProvider theme={baseTheme => createTheme({
            ...baseTheme,
            isAgeRestricted,
            isPreview: props.previewMode
        } as Theme)}>
            <S.Carousel>
                <Carousel
                additionalClass="experience-carousel"
                items={carouselItems}
                showFullscreenButton={false}
                thumbnailPosition="left"
                showPlayButton={false}
                showNav={false}
                showBullets
                {...isOptimizedImage(experience.images[0]) && {
                    renderItem: function Item(item) {
                        return <CarouselItem { ...item } />;
                    },
                    renderThumbInner: function ThumbInner(item) {
                        return <CarouselThumbnail { ...item } />;
                    }
                }} />
            </S.Carousel>
            <S.Body>
                <S.MainInfos>
                    <div>
                        {experience.isOnlineExperience &&
                            <S.OnlineBadge>
                                <Image
                                src={onlineIcon}
                                alt={text.online}
                                width={props.previewMode ? 15 : 20}
                                height={props.previewMode ? 15 : 20} />
                                {text.online}
                            </S.OnlineBadge>}
                        <S.Title>{experience.title}</S.Title>
                        <S.Location>{experience.location}</S.Location>
                        {experience.ratingValue && 
                            <S.Rating onClick={() => reviewsRef.current?.scrollIntoView()}>
                                <StarRateIcon sx={{ fontSize: 'inherit' }} />
                                {experience.ratingValue.toFixed(1)}
                                <S.NumRatings>({experience.numRatings})</S.NumRatings>
                            </S.Rating>}
                    </div>
                    <S.ShareSaveContainer>
                        {props.onShareClick && 
                            <S.ShareSaveFab
                            size="small"
                            disableRipple
                            onClick={props.onShareClick}>
                                <S.ShareSaveIcon icon={faShareSquare} />
                            </S.ShareSaveFab>}
                        {props.onHeartClick && 
                            <S.ShareSaveFab
                            size="small"
                            disableRipple
                            onClick={props.onHeartClick}>
                                <S.ShareSaveIcon 
                                icon={faHeart} 
                                sx={{ 
                                    color: props.isExperienceSaved ? '#FE4164' : 'whitesmoke' 
                                }} />
                            </S.ShareSaveFab>}
                    </S.ShareSaveContainer>
                </S.MainInfos>
                <Box sx={{ display: 'flex', m: '10px 0' }}>
                    {experience.categories.map(categ =>
                        <S.Category
                        key={uuid()}
                        category={categ}
                        iconLocation="left" />
                    )}
                </Box>
                <S.QuickInfos>
                    <QuickInfo 
                    icon={faClock}
                    label={text.duration}
                    content={getFormattedDuration(experience.duration)} />
                    <QuickInfo 
                    icon={faUsers}
                    label={text.upTo}
                    content={`${experience.capacity} ${
                        experience.capacity > 1 ? text.people : text.person
                    }`} />
                    <QuickInfo 
                    icon={faComments}
                    label={experience.languages.length > 1 ? text.languages : text.language}
                    content={experience.languages.join(', ')} />
                    {isAgeRestricted &&
                        <QuickInfo
                        icon={faUserPlus}
                        label={text.ageRestriction}
                        content={`${experience.ageRestriction} +`} />}
                </S.QuickInfos>
                <S.SectionLabel>{text.hostedBy}</S.SectionLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', m: '0.5rem 0' }}>
                    <Avatar>
                        {creator.user.photo?.src ? 
                            <Image
                            src={creator.user.photo.src}
                            alt={creator.user.firstName}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={creator.user.photo.placeholder} /> :
                            creator.user.firstName.charAt(0)}
                    </Avatar>
                    <Box component="span" sx={{ fontSize: '0.9rem', color: '#CBCBCB', m: '0 10px' }}>
                        {creator.user.firstName}
                    </Box>
                    <S.DarkButton onClick={() => setIsBioExpanded(expanded => !expanded)}>
                        {text.aboutCreator}
                    </S.DarkButton>
                </Box>
                <S.BodyText 
                component={Collapse} 
                { ...{ in: isBioExpanded, timeout: 300 } as CollapseProps}>
                    {creator.bio}
                </S.BodyText>
                <S.SectionLabel>{text.planning}</S.SectionLabel>
                <S.BodyText component="p">{experience.description}</S.BodyText>
                {experience.includedItems.length > 0 && 
                    <>  
                        <S.SectionLabel>{text.included}</S.SectionLabel>
                        <S.ItemList>
                            {experience.includedItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </S.ItemList>
                    </>}
                {experience.toBringItems.length > 0 && 
                    <>  
                        <S.SectionLabel>{text.toBring}</S.SectionLabel>
                        <S.ItemList>
                            {experience.toBringItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </S.ItemList>
                    </>}
                {!experience.isOnlineExperience && 
                    <>
                        <S.SectionLabel>{text.location}</S.SectionLabel>
                        <S.Map>
                            <Image
                            alt="map"
                            src={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/pin-l+FFF(${experience.longitude},${experience.latitude})/${experience.longitude},${experience.latitude},13/500x300@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                            layout="fill"
                            objectFit="cover" />
                        </S.Map>
                    </>}
                {props.reviews && 
                    <>
                        <S.ReviewDivisor />
                        <Box ref={reviewsRef} sx={{ position: 'relative' }}>
                            <S.SectionLabel>{text.reviews}</S.SectionLabel>
                            <S.ShowReviewsButton
                            disabled={props.reviews.length === 0}
                            onClick={props.onSeeAllReviews}>
                                {text.seeAllReviewsButton}
                            </S.ShowReviewsButton>
                            {props.reviews.length > 0 &&
                                <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
                                    {props.reviews.slice(0, 4).map(review =>
                                        <li key={review._id}>
                                            <S.ReviewTitle>
                                                {review.writtenBy}
                                                <S.ReviewStars readOnly value={review.value} />
                                            </S.ReviewTitle>
                                            <S.BodyText component="p">{review.text}</S.BodyText>
                                        </li>
                                    )}
                                </Box>}
                            {props.onAddReview && 
                                <S.DarkButton
                                onClick={props.onAddReview}
                                sx={{ m: '1rem auto 0', display: 'block' }}>
                                    {text.addReviewButton}
                                </S.DarkButton>}
                        </Box>
                    </>}
            </S.Body>
        </ThemeProvider>
    );
}

export default Experience;