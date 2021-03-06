import React from 'react';

import useLanguageContext from 'context/languageContext';
import type { ExperienceCardProps } from './index';

import Image from 'next/image';
import NavLink from 'components/NavLink';
import StarRateIcon from '@material-ui/icons/StarRate';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import onlineIcon from 'public/images/online-experience-icon.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ExperienceCard.styles';
const useStyles = makeStyles(styles);

const ExperienceCard = (props: ExperienceCardProps) => {
    const { appText, language } = useLanguageContext(); 
    const { ExperienceCard: text } = appText; 
    
    // Use the first image for the card
    const image = props.experience.images[0];
    const hasRatingInfo = Boolean(props.experience.ratingValue);
    const priceText = props.experience.isOnlineExperience ? text.perConnection : text.perPerson;
    
    const classes = useStyles({
        language,
        hasRatingInfo,
        isSaved: Boolean(props.isSaved)
    });

    // Use "go back" mechanism in mobile, open in new tab on desktop
    return (
        <div className={`${classes.root} ${props.containerClass}`}>
            {props.isSaved !== undefined &&
                <Fab 
                className={classes.heartFab} 
                disableRipple 
                onClick={props.onHeartClick}>
                    <FontAwesomeIcon icon={faHeart} className={classes.heartIcon} />
                </Fab>}
                <NavLink link={props.linkTo} className={classes.link}>
                    {props.experience.isOnlineExperience && 
                        <div className={classes.online}>
                            <Image
                            src={onlineIcon}
                            alt={text.online}
                            width={20}
                            height={20} />
                            {text.online}
                        </div>}
                    <div className={classes.image}>
                        <Image
                        src={image.src}
                        alt={props.experience.title}
                        placeholder="blur"
                        blurDataURL={image.placeholder}
                        layout="fill"
                        objectFit="cover" />
                    </div>
                    <div className={classes.body}>
                        <p className={classes.title}>{props.experience.title}</p>
                        <p className={classes.location}>{props.experience.location}</p>
                        {hasRatingInfo &&
                            <p className={classes.rating}>
                                {props.experience.ratingValue!.toFixed(2)} 
                                <StarRateIcon className={classes.starIcon} />
                            </p>}
                        <p className={classes.priceInfo}>
                            <span className={classes.price}>
                                ${props.experience.pricePerPerson}{' '} 
                            </span>
                            {priceText.toUpperCase()}
                        </p>
                    </div>
            </NavLink>
        </div>
    );
}

export default React.memo(ExperienceCard, (prevProps, nextProps) => 
    prevProps.experience._id === nextProps.experience._id &&
    prevProps.isSaved === nextProps.isSaved
);