import React from 'react';

import type { GradientButtonProps } from './index';

import NavLink from 'components/NavLink';

import { makeStyles } from '@material-ui/core/styles';
import styles from './GradientButton.styles';
const useStyles = makeStyles(styles);

const GradientButton: React.FC<GradientButtonProps> = (props) => {
    const classes = useStyles(props);

    const button = (
        <button { ...props } className={`${classes.root} ${props.className}`}>
            {props.children}
        </button>
    );

    if (props.href) {
        return (
            <NavLink link={{ href: props.href, as: props.as! }} className={classes.link}>
                {button}
            </NavLink>
        );
    } else {
        return button;
    }
}

export default GradientButton;