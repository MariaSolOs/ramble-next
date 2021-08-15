import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { SubmittedMessageProps } from './index';

import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SubmittedMessage.styles';
const useStyles = makeStyles(styles);

const SubmittedMessage = (props: SubmittedMessageProps) => {
    const { CreateExperience: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>{text.submittedTitle}</h1>
            <p className={classes.message}>
                {text.submittedMessage1} 
                <strong> {props.experienceTitle} </strong> 
                {text.submittedMessage2}  <br />
                {text.submittedMessage3}
            </p>
            <GradientButton 
            { ...routes.home }
            variant="creator"
            className={classes.button}>
                {text.submittedButton}
            </GradientButton>
        </div>
    );
}

export default SubmittedMessage;