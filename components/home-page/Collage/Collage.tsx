import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { CollageProps } from './index';

import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Collage.styles';
const useStyles = makeStyles(styles);

const Collage = (props: CollageProps) => {
    const classes = useStyles();
    const { Home: text } = useLanguageContext().appText;

    return (
        <div className={classes.gridContainer}>
            <div className={classes.grid}>
                {props.images.map((img, idx) =>
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
                        <span className={classes.montreal}> Montréal.</span>
                    </h5>
                </figure>
            </div>
            <h2 className={classes.title}>
                {text.experienceTitle}
                <span className={classes.montreal}> Montréal.</span>
            </h2>
        </div>
    );
}

export default Collage;