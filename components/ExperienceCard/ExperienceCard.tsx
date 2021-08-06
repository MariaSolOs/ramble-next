import React from 'react';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { ExperienceCardProps } from './index';

import Image from 'next/image';
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
    const classes = useStyles({
        language,
        hasRatingInfo: Boolean(props.experience.rating),
        isSaved: Boolean(props.isSaved)
    });

    const linkUrl = `${process.env.NEXT_PUBLIC_RAMBLE_URL}${routes.experienceDetails(props.experience._id).href}`;
    const priceText = props.experience.isZoomExperience ? text.perConnection : text.perPerson;

    return (
        <div className={`${classes.root} ${props.containerClass}`}>
            {props.onHeartClick &&
                <Fab 
                className={classes.heartFab} 
                disableRipple 
                onClick={props.onHeartClick}>
                    <FontAwesomeIcon icon={faHeart} className={classes.heartIcon} />
                </Fab>}
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" >
                {props.experience.isZoomExperience && 
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
                    src={props.experience.image.src}
                    alt={props.experience.title}
                    placeholder="blur"
                    blurDataURL={props.experience.image.placeholder}
                    layout="fill"
                    objectFit="cover" />
                </div>
                <div className={classes.body}>
                    <p className={classes.title}>{props.experience.title}</p>
                    <p className={classes.location}>{props.experience.location}</p>
                    {props.experience.rating &&
                        <p className={classes.rating}>
                            {props.experience.rating.toFixed(2)} 
                            <StarRateIcon className={classes.starIcon} />
                        </p>}
                    <p className={classes.priceInfo}>
                        <span className={classes.price}>
                            ${props.experience.price}{' '} 
                        </span>
                        {priceText.toUpperCase()}
                    </p>
                </div>
            </a>
        </div>
    );
}

export default React.memo(ExperienceCard, (prevProps, nextProps) => 
    prevProps.experience._id === nextProps.experience._id &&
    prevProps.isSaved === nextProps.isSaved
);