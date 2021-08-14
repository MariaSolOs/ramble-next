import React from 'react';

import type { SlideTitleProps } from './index';

import { makeStyles } from '@material-ui/core/styles';
import styles from './SlideTitle.styles';
const useStyles = makeStyles(styles);

const SlideTitle: React.FC<SlideTitleProps> = (props) => {
    const classes = useStyles();

    return (
        <h2 className={`${classes.root} ${props.className}`}>
            {props.children}
        </h2>
    );
}

export default SlideTitle;