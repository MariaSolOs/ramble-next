import MUICheckbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import type { CheckboxProps } from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Checkbox.styles';
const useStyles = makeStyles(styles);

const Checkbox = (props: CheckboxProps) => {
    const classes = useStyles();

    return (
        <MUICheckbox 
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<FiberManualRecordIcon />}
        disableRipple
        classes={{
            root: classes.root,
            checked: classes.checked
        }}
        { ...props } />
    );
}

export default Checkbox;