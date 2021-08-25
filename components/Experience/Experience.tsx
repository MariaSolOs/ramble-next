import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { ReactImageGalleryItem } from 'react-image-gallery';

import useLanguageContext from 'context/languageContext';
import { getFormattedDuration } from 'lib/date-time';
import { isOptimizedImage } from 'models/files';
import type { ExperienceProps, CarouselImgProps } from './index';

import Image from 'next/image';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Rating from '@material-ui/lab/Rating';
import Carousel from 'react-image-gallery';
import StarRateIcon from '@material-ui/icons/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import CategoryBox from 'components/CategoryBox';
import onlineIcon from 'public/images/online-experience-icon.svg';

import 'react-image-gallery/styles/css/image-gallery.css';
import { makeStyles } from '@material-ui/core/styles';
import { desktopStyles, mobileStyles } from './Experience.styles';

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

const Experience = (props: ExperienceProps) => {
    const { Experience: text } = useLanguageContext().appText;
    const { experience } = props;
    const { creator } = experience;
    const ageRestricted = Boolean(props.experience.ageRestriction);

    const [isBioExpanded, setIsBioExpanded] = useState(false);

    const useStyles = makeStyles(props.useMobileDisplay ? mobileStyles : desktopStyles);
    const classes = useStyles({ 
        isExperienceSaved: Boolean(props.isExperienceSaved),
        numQuickInfosColumns: ageRestricted ? 4 : 3
    });

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

    const getQuickInfo = (icon: IconDefinition, label: string, content: string) => (
        <div className={classes.quickInfoColumn}>
            <div className={classes.quickInfoIconCircle}>
                <FontAwesomeIcon icon={icon} className={classes.quickInfoIcon} />
            </div>
            <span className={classes.quickInfoLabel}>{label}</span>
            <span className={classes.quickInfoContent}>{content}</span>
        </div>
    );

    return (
        <>
            <Carousel
            additionalClass={classes.carousel}
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
            <div className={classes.body}>
                <div className={classes.mainInfos}>
                    <div>
                        {experience.isOnlineExperience &&
                            <div className={classes.online}>
                                <Image
                                src={onlineIcon}
                                alt={text.online}
                                width={props.useMobileDisplay ? 15 : 20}
                                height={props.useMobileDisplay ? 15 : 20} />
                                {text.online}
                            </div>}
                        <h1 className={classes.title}>
                            {experience.title}
                        </h1>
                        <h3 className={classes.location}>
                            {experience.location}
                        </h3>
                        {experience.ratingValue && 
                            <p className={classes.rating}>
                                <StarRateIcon />
                                {experience.ratingValue.toFixed(1)}
                                <span className={classes.numRatings}>
                                    ({experience.numRatings})
                                </span>
                            </p>}
                    </div>
                    <div className={classes.shareSaveContainer}>
                        {props.onShareClick && 
                            <Fab
                            size="small" 
                            disableRipple
                            className={classes.shareSaveButton}
                            onClick={props.onShareClick}>
                                <FontAwesomeIcon 
                                icon={faShareSquare} 
                                className={classes.shareIcon} />
                            </Fab>}
                        {props.isExperienceSaved !== undefined &&
                            <Fab 
                            size="small"
                            disableRipple
                            className={classes.shareSaveButton}
                            onClick={props.onHeartClick}>
                                <FontAwesomeIcon 
                                icon={faHeart}
                                className={classes.heartIcon} />
                            </Fab>}
                    </div>
                </div>
                <div className={classes.categories}>
                    {experience.categories.map(categ =>
                        <CategoryBox 
                        key={uuid()}
                        category={categ}
                        iconLocation="left"
                        boxClass={classes.category} />
                    )}
                </div>
                <div className={classes.quickInfos}>
                    {getQuickInfo(
                        faClock, 
                        text.duration, 
                        getFormattedDuration(experience.duration)
                    )}
                    {getQuickInfo(
                        faUsers, 
                        text.upTo,
                        `${experience.capacity} ${
                            experience.capacity > 1 ? text.people : text.person
                        }`
                    )}
                    {getQuickInfo(
                        faComments,
                        experience.languages.length > 1 ? text.languages : text.language,
                        experience.languages.join(', ')
                    )}
                    {ageRestricted &&
                        getQuickInfo(
                            faUserPlus,
                            text.ageRestriction,
                            `${experience.ageRestriction} +`
                        )}
                </div>
                <h3 className={classes.sectionLabel}>{text.hostedBy}</h3>
                <div className={classes.host}>
                    <Avatar>
                        {creator.user.photo?.src ? 
                            <Image
                            src={creator.user.photo.src}
                            alt={creator.user.firstName}
                            layout="fill"
                            placeholder="blur"
                            blurDataURL={creator.user.photo.placeholder} /> :
                            creator.user.firstName.charAt(0)}
                    </Avatar>
                    <span className={classes.creatorName}>
                        {creator.user.firstName}
                    </span>
                    <button 
                    className={classes.darkButton} 
                    onClick={() => setIsBioExpanded(!isBioExpanded)}>
                        {text.aboutCreator}
                    </button>
                </div>
                <Collapse className={classes.bodyText} in={isBioExpanded} timeout={300}>
                    {creator.bio}
                </Collapse>
                <h3 className={classes.sectionLabel}>{text.planning}</h3>
                <p className={classes.bodyText}>{experience.description}</p>
                {experience.includedItems.length > 0 && 
                    <>  
                        <h3 className={classes.sectionLabel}>{text.included}</h3>
                        <ul className={classes.itemList}>
                            {experience.includedItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </ul>
                    </>}
                {experience.toBringItems.length > 0 && 
                    <>  
                        <h3 className={classes.sectionLabel}>{text.toBring}</h3>
                        <ul className={classes.itemList}>
                            {experience.toBringItems.map(item => 
                                <li key={uuid()}>{item}</li>
                            )}
                        </ul>
                    </>}
                {!experience.isOnlineExperience &&
                    <>
                        <h3 className={classes.sectionLabel}>{text.location}</h3>
                        <div className={classes.map}>
                            <Image
                            alt="map"
                            src={`https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/pin-l+FFF(${experience.longitude},${experience.latitude})/${experience.longitude},${experience.latitude},13/500x300@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                            layout="fill"
                            objectFit="cover" />
                        </div>
                    </>}
                {props.reviews &&
                    <>
                        <div className={classes.reviewDivisor} />
                        <div className={classes.reviewsContainer}>
                            <h3 className={classes.sectionLabel}>{text.reviews}</h3>
                            <button 
                            disabled={props.reviews.length === 0}
                            onClick={props.onSeeAllReviews}
                            className={classes.showAllReviewsButton}>
                                {text.seeAllReviewsButton}
                            </button>
                            {props.reviews.length > 0 && 
                                <ul className={classes.reviewList}>
                                    {props.reviews.slice(0, 4).map(review =>
                                        <li key={review._id}>
                                            <h4 className={classes.reviewTitle}>
                                                {review.writtenBy}
                                                <Rating
                                                readOnly
                                                value={review.value}
                                                className={classes.ratingStars} />
                                            </h4>
                                            <p className={classes.bodyText}>
                                                {review.text}
                                            </p>
                                        </li>
                                    )}
                                </ul>}
                            {props.onAddReview &&
                                <button 
                                className={classes.darkButton} 
                                onClick={props.onAddReview}>
                                    {text.addReviewButton}
                                </button>}
                        </div>
                    </>}
            </div>
        </>
    );
}

export default Experience;