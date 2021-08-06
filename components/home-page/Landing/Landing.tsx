// import { useEffect } from 'react';
// import { useSession } from 'next-auth/client';
import { v4 as uuid } from 'uuid';

// import { GetUserSavedExperiencesDocument } from 'graphql-server/operations';

import useLanguageContext from 'context/languageContext';
import type { LandingProps } from './index';

import Image from 'next/image';
import ExperienceCard from 'components/ExperienceCard';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Landing.styles';
const useStyles = makeStyles(styles);

const Landing = (props: LandingProps) => {
    const { Home: text } = useLanguageContext().appText;
    const classes = useStyles();

    // If the user is logged in, fetch their saved experiences
    // const [session] = useSession();
    // const isLoggedIn = Boolean(session?.user.userId);
    // const [getUserExperiences] = useLazyQuery(GetUserSavedExperiencesDocument, {
    //     onCompleted: ({ me }) => {
    //         savedExperiencesVar(me.savedExperiences.map(({ _id }) => _id));
    //     }
    // });

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         getUserExperiences();
    //     }
    // }, [isLoggedIn, getUserExperiences]);

    return (
        <>
            <div className={classes.gridContainer}>
                <div className={classes.grid}>
                    {props.collageImages.map((img, idx) =>
                        <figure 
                        key={uuid()} 
                        className={`${classes.gridItem} grid-item-${idx + 1}`}>
                            <div className={classes.gridImg}>
                                <Image
                                src={img.src}
                                alt="Experience grid"
                                placeholder="blur"
                                layout="fill"
                                objectFit="cover"
                                blurDataURL={img.placeholder} />
                            </div>
                        </figure>
                    )}
                    <figure className={classes.titleFigure}>
                        <h5 className={classes.gridTitle}>
                            {text.experienceTitle}
                        </h5>
                    </figure>
                </div>
                <h2 className={classes.title}>{text.experienceTitle}</h2>
            </div>
            <div className={classes.divider} />
            <div className={classes.experienceContainer}>
                <h3 className={classes.discoverTitle}>
                    {text.discoverTitle}
                </h3>
                <div className={classes.experiences}>
                    {props.featuredExperiences.map(exp => 
                        <ExperienceCard
                        key={exp._id}
                        experience={exp}
                        containerClass={classes.experienceCard} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Landing;