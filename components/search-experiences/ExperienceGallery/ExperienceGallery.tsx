import useUserExperiences from 'hooks/useUserExperiences';
import type { ExperienceGalleryProps } from './index';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ExperienceCard from 'components/ExperienceCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ExperienceGallery.styles';
const useStyles = makeStyles(styles);

const ExperienceGallery = (props: ExperienceGalleryProps) => {
    const { isExperienceSaved, handleSavingToggle } = useUserExperiences();
    const classes = useStyles();

    return (
        <TransitionGroup className={classes.gallery}>
            {props.experiences.map((exp, index) => 
                <CSSTransition
                key={exp._id}
                timeout={300}
                classNames={{
                    enter: classes.cardFadeOut,
                    enterActive: classes.cardFadeIn,
                    exit: classes.cardFadeIn,
                    exitActive: classes.cardFadeOut
                }}>
                    <div style={{ transitionDelay: `${index * 70}ms` }}>
                        <ExperienceCard
                        experience={exp}
                        containerClass={classes.card}
                        isSaved={isExperienceSaved(exp._id)}
                        onHeartClick={() => handleSavingToggle(exp._id)} />
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}

export default ExperienceGallery;