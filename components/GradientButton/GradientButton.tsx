import React from 'react';

import type { GradientButtonProps } from './index';

import Link from 'next/link';

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
            <Link href={props.href} as={props.as} passHref>
                <a className={classes.link}>{button}</a>
            </Link>
        );
    } else {
        return button;
    }
}

export default GradientButton;