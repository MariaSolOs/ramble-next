import MUITextField from '@material-ui/core/TextField';
import type { OutlinedTextFieldProps } from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TextField.styles';
const useStyles = makeStyles(styles);

const TextField = (props: Omit<OutlinedTextFieldProps, 'variant'>) => {
    const { InputProps, ...otherProps } = props;
    const classes = useStyles();

    return (
        <MUITextField
        variant="outlined"
        InputProps={{
            classes: {
                root: classes.inputRoot,
                focused: classes.inputFocused
            },
            ...InputProps
        }}
        InputLabelProps={{
            classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
            }
        }}
        FormHelperTextProps={{
            classes: {
                root: classes.helperTextRoot
            }
        }}
        { ...otherProps } />
    );
}

export default TextField;