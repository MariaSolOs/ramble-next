import React from 'react';

import type { CalendarLayoutProps } from './index';

import { makeStyles } from '@material-ui/core/styles';
import styles from './CalendarLayout.styles';
const useStyles = makeStyles(styles);

const CalendarLayout: React.FC<CalendarLayoutProps> = (props) => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            {props.CalendarComponent}
            {props.useMobileLayout ? 
                props.children :
                <div className={classes.infosContainer}>
                    {props.children}
                </div>}
        </main>
    );
}

export default CalendarLayout;