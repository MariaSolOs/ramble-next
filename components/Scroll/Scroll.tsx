import React from 'react';

import CustomScroll from 'react-custom-scroll';
import type { CustomScrollProps } from 'react-custom-scroll';

import 'react-custom-scroll/dist/customScroll.css';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Scroll.styles';
const useStyles = makeStyles(styles);

const Scroll: React.FC<CustomScrollProps> = (props) => {
    const classes = useStyles();
    const { className, ...otherProps } = props;

    return (
        <CustomScroll className={`${classes.root} ${className}`} { ...otherProps }>
            {props.children}
        </CustomScroll>
    );
}

export default Scroll;