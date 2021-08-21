import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { NoExperiencesCardProps } from './index';

import Image from 'next/image';
import Avatar from '@material-ui/core/Avatar';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './NoExperiencesCard.styles';
const useStyles = makeStyles(styles);

const NoExperiencesCard = (props: NoExperiencesCardProps) => {
    const { NoExperiencesCard: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar className={classes.avatar}>
                <Image 
                src={props.creatorPhoto.src}
                alt={props.creatorName}
                width={90}
                height={90}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={props.creatorPhoto.placeholder} />
            </Avatar>
            <h3 className={classes.creatorName}>{props.creatorName},</h3>
            <p className={classes.message}>{text.message}</p>
            <GradientButton 
            variant="creator"
            className={classes.button}
            { ...routes.newExperience }>
                {text.button}
            </GradientButton>
        </div>
    );
}

export default NoExperiencesCard;