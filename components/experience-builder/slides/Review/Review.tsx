import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import { isFile } from 'models/files';
import { getFormPreview } from 'models/experience-interface';
import type { ReviewProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Experience from 'components/Experience';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Review.styles';
const useStyles = makeStyles(styles);

const Review = (props: ReviewProps) => {
    const { BuilderSlides_Review: text } = useLanguageContext().appText;
    const classes = useStyles();

    // Map the files to image URLs if applicable
    const images = props.form.images.map(img => ({
        url: isFile(img!) ? URL.createObjectURL(img) : img!,
        wasFile: isFile(img!)
    }));
    const imageUrls = images.map(({ url }) => url);

    // Make the form appropriate for the component
    const experience = getFormPreview(
        props.creatorBio,
        props.creatorName,
        props.creatorPhoto,
        imageUrls,
        props.form
    );

    const { onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(true);
    }, [onSlideComplete]);

    // Make sure to clean up the generated URLs
    useEffect(() => {
        return () => {
            for (const img of images) {
                if (img.wasFile) {
                    URL.revokeObjectURL(img.url);
                }
            }
        }
    }, [images]);

    return (
        <>
            <Title>{text.title}</Title>
            <div className={classes.experienceContainer}>
                <Experience
                experience={experience}
                useMobileDisplay />
            </div>
        </>
    );
}

export default Review;