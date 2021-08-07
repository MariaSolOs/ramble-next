import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { CreatorBiosProps } from './index';

import Image from 'next/image';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatorBios.styles';
const useStyles = makeStyles(styles);

const CreatorBios = (props: CreatorBiosProps) => {
    const { appText, language } = useLanguageContext();
    const { BecomeACreator: text } = appText;
    const classes = useStyles();

    const [slideIdx, setSlideIdx] = useState(0);
    const creator = props.bios[slideIdx];
    const biosLength = props.bios.length;

    return (
        <div className={classes.slide}>
            <h1 className={classes.title}>
                {text.currentCreators1}
                <div className={classes.underlined}>
                    {text.currentCreators2}
                    <span className={classes.gradientLine} />
                </div>
            </h1>
            <TransitionGroup>
                <CSSTransition
                unmountOnExit
                timeout={400}
                key={uuid()}
                classNames={{
                    enter: classes.zoomEnter,
                    enterActive: classes.zoomEnterActive,
                    exitActive: classes.zoomExit
                }}>
                    <div className={classes.creatorCard}>
                        <div className={classes.creatorImgContainer}>
                            <KeyboardArrowLeftIcon 
                            className={classes.bioArrow}
                            onClick={() => {
                                setSlideIdx((slideIdx + biosLength - 1) % biosLength)
                            }} />
                            <div className={classes.creatorImg}>
                                <Image
                                src={creator.image.src}
                                alt={creator.name}
                                placeholder="blur"
                                layout="fill"
                                objectFit="cover"
                                blurDataURL={creator.image.placeholder} />
                            </div>
                            <KeyboardArrowRightIcon
                            className={classes.bioArrow}
                            onClick={() => {
                                setSlideIdx((slideIdx + 1) % biosLength)
                            }} />
                        </div>
                        <h5 className={classes.creatorName}>{creator.name}</h5>
                        <p className={classes.creatorBio}>
                            {creator.bio[language]}
                        </p>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default CreatorBios;