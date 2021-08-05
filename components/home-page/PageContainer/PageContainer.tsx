import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PageContainer.styles';
const useStyles = makeStyles(styles);

const PageContainer: React.FC = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
}

export default PageContainer;