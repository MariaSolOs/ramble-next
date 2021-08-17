import routes from 'routes';
import type { ErrorProps } from './index';

import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Error.styles';
const useStyles = makeStyles(styles);

const Error = (props: ErrorProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 className={classes.errorCode}>{props.statusCode}</h1>
            <h2 className={classes.whiteTitle}>{props.title}</h2>
            <h2 className={classes.greyTitle}>{props.message}</h2>
            <GradientButton { ...routes.home } variant="error" className={classes.button}>
                {props.buttonText}
            </GradientButton>
        </div>
    );
}

export default Error;