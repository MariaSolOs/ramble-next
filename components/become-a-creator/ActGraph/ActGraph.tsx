import useLanguageContext from 'context/languageContext';
import type { GraphItemProps } from './index';

import Image from 'next/image';
import lightbulbIcon from 'public/images/actout-lightbulb.svg';
import cloudIcon from 'public/images/actout-cloud.svg';
import walletIcon from 'public/images/actout-wallet.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ActGraph.styles';
const useStyles = makeStyles(styles);

const GraphItem = (props: GraphItemProps) => {
    const classes = useStyles();

    return (
        <div className={classes.graphItem}>
            <div className={classes.graphCircle}>
                <Image
                src={props.icon}
                width={35}
                height={35}
                alt={props.iconAlt} />
            </div>
            <p className={classes.graphText}>
                {props.description}
            </p>
        </div>
    );
}

const ActGraph = () => {
    const { BecomeACreator: text } = useLanguageContext().appText;
    const classes = useStyles();

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
                    <GraphItem 
                    icon={lightbulbIcon}
                    iconAlt="Share your passion"
                    description={text.lightbulbText} />
                    <GraphItem 
                    icon={cloudIcon}
                    iconAlt="Bring people into your world" 
                    description={text.cloudText} />
                    <GraphItem 
                    icon={walletIcon}
                    iconAlt="Make money"
                    description={text.walletText} />
                </div>
                <div className={classes.gradientLine} />
            </div>
        </div>
    );
}

export default ActGraph;