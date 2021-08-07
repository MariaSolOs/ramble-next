import { useSession } from 'next-auth/client';

import routes from 'routes';
import useSavedExperiences from 'hooks/useSavedExperiences';
import useLanguageContext from 'context/languageContext';
import type { FeaturedExperiencesProps } from './index';

import ExperienceCard from 'components/ExperienceCard';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './FeaturedExperiences.styles';
const useStyles = makeStyles(styles);

const FeaturedExperiences = (props: FeaturedExperiencesProps) => {
    const { Home: text } = useLanguageContext().appText;
    const [session] = useSession();
    const isLoggedIn = Boolean(session?.user.userId);
    const { isExperienceSaved, handleSavingToggle } = useSavedExperiences(isLoggedIn);
    const classes = useStyles();

    return (
        <>
            <div className={classes.divider} />
            <div className={classes.experienceContainer}>
                <h3 className={classes.discoverTitle}>
                    {text.discoverTitle}
                </h3>
                <div className={classes.experiences}>
                    {props.experiences.map(exp => 
                        <ExperienceCard
                        key={exp._id}
                        experience={exp}
                        containerClass={classes.experienceCard}
                        {...isLoggedIn && {
                            isSaved: isExperienceSaved(exp._id),
                            onHeartClick: () => handleSavingToggle(exp._id)
                        }} />
                    )}
                </div>
            </div>
            <GradientButton 
            { ...routes.experienceSearch('Montréal, Canada', '2') }
            className={classes.searchButton} 
            variant="experience">
                {text.seeAllButton}
            </GradientButton>
        </>
    );
}

export default FeaturedExperiences;