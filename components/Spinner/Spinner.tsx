import React from 'react';

import type { SpinnerProps } from './index';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Spinner.styles';
const useStyles = makeStyles(styles);

const Spinner = (props: SpinnerProps) => {
    const classes = useStyles();

    return (
        <div className={classes.backdrop}>
            <div className={props.className}>
                <div className={classes.spinner}>
                    <div className={classes.bounce1} />
                    <div className={classes.bounce2} />
                    <div className={classes.bounce3} />
                </div>
            </div>
        </div>
    );
}

export default React.memo(Spinner);