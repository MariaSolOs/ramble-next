import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { CreatedExperiencesProps } from './index';
 
import ExperienceCard from 'components/ExperienceCard';
import Tip from 'components/Tip';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CreatedExperiences.styles';
const useStyles = makeStyles(styles);

const CreatedExperiences = (props: CreatedExperiencesProps) => {
    const { CreatedExperiences: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <>
            <Tip className={classes.tip}>{text.tip}</Tip>
            <div className={classes.experiences}>
                {props.experiences.map(exp => 
                    <ExperienceCard
                    key={exp._id}
                    experience={exp}
                    linkTo={routes.editExperience(exp._id)}
                    containerClass={classes.card} />
                )}
            </div>
        </>
    );
}

export default CreatedExperiences;