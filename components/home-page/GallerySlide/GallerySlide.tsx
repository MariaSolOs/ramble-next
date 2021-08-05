import { v4 as uuid } from 'uuid';

import type { GallerySlideProps } from './index';

import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GallerySlides.styles';
const useStyles = makeStyles(styles);

const GallerySlide = (props: GallerySlideProps) => {
    const classes = useStyles();

    return (
        <div className={classes.gallerySlide}>
            <h1 className={classes.title}>{props.title}</h1>
            <h3 className={classes.subtitle}>{props.subtitle}</h3>
            <div className={classes.imagesContainer}>
                {props.images.map(({ src, placeholder }) => 
                    <div key={uuid()} className={classes.image}>
                        <Image
                        src={src}
                        width={400}
                        height={500}
                        placeholder="blur"
                        blurDataURL={placeholder}
                        alt="Experience preview" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default GallerySlide;