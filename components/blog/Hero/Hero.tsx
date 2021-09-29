import type { HeroProps } from './index';

import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Hero.styles';
const useStyles = makeStyles(styles);

const Hero = (props: HeroProps) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.hero}>
                <Image
                alt={props.title}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                className={classes.heroImg}
                { ...props.imageProps } />
                <h3 className={classes.title}>{props.title}</h3>
            </div>
        </>
    );
}

export default Hero;