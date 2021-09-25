import useLanguageContext from 'context/languageContext';
import type { BlogHeroProps } from './index';

import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles';
import styles from './BlogHero.styles';
const useStyles = makeStyles(styles);

const BlogHero = (props: BlogHeroProps) => {
    const { Blog: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <>
            <div className={classes.hero}>
                <Image
                src={props.image.src}
                alt={text.heroTitle}
                placeholder="blur"
                blurDataURL={props.image.placeholder}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                className={classes.heroImg} />
                <h3 className={classes.title}>{text.heroTitle}</h3>
            </div>
        </>
    );
}

export default BlogHero;