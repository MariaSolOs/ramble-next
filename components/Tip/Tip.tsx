import type { TipProps } from './index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Tip.styles';
const useStyles = makeStyles(styles);

const Tip: React.FC<TipProps> = (props) => {
    const classes = useStyles();

    return (
        <p className={`${classes.root} ${props.className}`}>
            <FontAwesomeIcon className={classes.icon} icon={props.icon || faLightbulb} />
            {props.children}
        </p>
    );
}

export default Tip;