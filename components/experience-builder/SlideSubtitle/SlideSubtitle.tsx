import React from 'react';

import type { SlideSubtitleProps } from './index';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SlideSubtitle.styles';
const useStyles = makeStyles(styles);

const SlideSubtitle: React.FC<SlideSubtitleProps> = (props) => {
    const classes = useStyles();

    return (
        <h4 className={`${classes.root} ${props.className}`}>
            {props.children}
        </h4>
    );
}

export default SlideSubtitle;