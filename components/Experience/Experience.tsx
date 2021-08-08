import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import useLanguageContext from 'context/languageContext';
import { getFormattedDuration } from 'utils/date-time';
import type { ExperienceProps, CarouselItemProps } from './index';

import Image from 'next/image';
import Fab from '@material-ui/core/Fab';
import CategoryBox from 'components/CategoryBox';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { StaticMap, Marker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import Carousel from 'react-image-gallery';
import onlineIcon from 'public/images/online-experience-icon.svg';

import 'react-image-gallery/styles/css/image-gallery.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { makeStyles } from '@material-ui/core/styles';
import { desktopStyles, mobileStyles } from './Experience.styles';

const CarouselItem = React.memo((props: CarouselItemProps) => {
    return (
        <div className="image-gallery-image">
            <Image
            src={props.original}
            alt={props.alt}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={props.placeholder} />
        </div>
    );
});

CarouselItem.displayName = 'CarouselItem';

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

    const carouselItems: CarouselItemProps[] = experience.images.map(img => ({
        original: img.src.replace('h_400', 'h_700'),
        thumbnail: img.src.replace('h_400', 'h_200'),
        placeholder: img.placeholder,
        alt: experience.title
    }));

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
            renderItem={item => <CarouselItem { ...(item as CarouselItemProps) } />} />
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
                    className={classes.bioToggler} 
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
                            <StaticMap
                            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                            mapStyle="mapbox://styles/mapbox/dark-v9"
                            width="100%"
                            height={300}
                            zoom={13}
                            latitude={experience.latitude || undefined}
                            longitude={experience.longitude || undefined}>
                                <Marker 
                                latitude={experience.latitude!}
                                longitude={experience.longitude!} 
                                className={classes.mapMarker}>
                                    <div className={classes.mapMarkerDot} />
                                </Marker>
                            </StaticMap>
                        </div>
                    </>}
            </div>
        </>
    );
}

export default Experience;