import useLanguageContext from 'context/languageContext';
import type { IntroAnimationProps } from './index';

import { CSSTransition } from 'react-transition-group';
import Div100vh from 'react-div-100vh';

import { makeStyles } from '@material-ui/core/styles';
import styles from './IntroAnimation.styles';
const useStyles = makeStyles(styles);

const IntroAnimation = (props: IntroAnimationProps) => {
    const { CreateExperience: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <Div100vh>
            <CSSTransition
            in={props.animationIn}
            timeout={1000}
            unmountOnExit
            classNames={{
                exit: classes.fadeExit,
                exitActive: classes.fadeExitActive
            }}>
                <div className={classes.container}>
                    <h2 className={classes.title}>{text.animationTitle1}</h2>
                    <h2 className={classes.title}>{text.animationTitle2}</h2>
                </div>
            </CSSTransition>
        </Div100vh>
    );
}

export default IntroAnimation;