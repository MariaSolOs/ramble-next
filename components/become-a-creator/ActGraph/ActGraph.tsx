import useLanguageContext from 'context/languageContext';

import Image from 'next/image';
import lightbulbIcon from 'public/images/actout-lightbulb.svg';
import cloudIcon from 'public/images/actout-cloud.svg';
import walletIcon from 'public/images/actout-wallet.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ActGraph.styles';
const useStyles = makeStyles(styles);

const ActGraph = () => {
    const { BecomeACreator: text } = useLanguageContext().appText;
    const classes = useStyles();

    const getGraphItem = (icon: any, iconAlt: string, description: string) => (
        <div className={classes.graphItem}>
            <div className={classes.graphCircle}>
                <Image src={icon} width={35} height={35} alt={iconAlt} />
            </div>
            <p className={classes.graphText}>{description}</p>
        </div>
    );

    return (
        <div className={classes.slide}>
            <h1 className={classes.title}>
                {text.actTitle1}
                <div className={classes.underlined}>
                    {text.actTitle2}
                    <span className={classes.gradientLine} />
                </div>
            </h1>
            <div className={classes.graphContainer}>
                <div className={classes.graph}>
                    {getGraphItem(
                        lightbulbIcon, 
                        'Share your passion', 
                        text.lightbulbText
                    )}
                    {getGraphItem(
                        cloudIcon, 
                        'Bring people into your world', 
                        text.cloudText
                    )}
                    {getGraphItem(
                        walletIcon, 
                        'Make money', 
                        text.walletText
                    )}
                </div>
                <div className={classes.gradientLine} />
            </div>
        </div>
    );
}

export default ActGraph;