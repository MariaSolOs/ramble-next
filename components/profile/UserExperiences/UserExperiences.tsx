import routes from 'routes';
import type { UserExperiencesProps } from './index';

import ExperienceCard from 'components/ExperienceCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './UserExperiences.styles';
const useStyles = makeStyles(styles);

const UserExperiences = (props: UserExperiencesProps) => {
    const classes = useStyles();

    return (
        <>
            <h4 className={classes.title}>{props.title}</h4>
            <div className={classes.cardsRow}>
                {props.experiences.map(exp => 
                    <ExperienceCard
                    key={exp._id}
                    experience={exp}
                    linkTo={routes.experienceDetails(exp._id)}
                    containerClass={classes.card} />
                )}
            </div>
        </>
    );
}

export default UserExperiences;