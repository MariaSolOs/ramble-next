import React from 'react';

import { GradientButtonProps } from './index';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GradientButton.styles';
const useStyles = makeStyles(styles);

const GradientButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & GradientButtonProps> = (props) => {
    const classes = useStyles(props);

    return (
        <button { ...props } className={`${classes.root} ${props.className}`}>
            { props.children }
        </button>
    );
}

export default GradientButton;