import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import { SettingProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Setting.styles';
const useStyles = makeStyles(styles);

const Setting = (props: SettingProps) => {
    const { BuilderSlides_Setting: text} = useLanguageContext().appText;
    const classes = useStyles();

    const { onSlideComplete, isOnlineExperience } = props;
    useEffect(() => {
        onSlideComplete(typeof isOnlineExperience !== 'undefined');
    }, [onSlideComplete, isOnlineExperience]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <div className={classes.typeBoxes}>
                <div 
                className={`
                    ${classes.typeBox}
                    ${isOnlineExperience === false && classes.selectedType}
                `} 
                onClick={() => props.onSelectType(false)}>
                    <div className={classes.typeBoxHeader}>
                        <EmojiPeopleIcon className={classes.personIcon} />
                        {text.inPerson}
                    </div>
                    <div className={classes.typeBoxDivider} />
                    <p className={classes.typeBoxMessage}>{text.inPersonOption}</p>
                </div>
                <div 
                className={`
                    ${classes.typeBox}
                    ${isOnlineExperience === true && classes.selectedType}
                `} 
                onClick={() => props.onSelectType(true)}>
                    <div className={classes.typeBoxHeader}>
                        <FontAwesomeIcon icon={faLaptop} className={classes.onlineIcon} />
                        {text.online}
                    </div>
                    <div className={classes.typeBoxDivider} />
                    <p className={classes.typeBoxMessage}>{text.onlineOption}</p>
                </div>
            </div>
        </>
    );
}

export default Setting;