import MUITextField from '@material-ui/core/TextField';
import type { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import type { InputBaseComponentProps } from '@material-ui/core/InputBase';

import InputMask from 'react-input-mask';

import { makeStyles } from '@material-ui/core/styles';
import styles from './TextField.styles';
const useStyles = makeStyles(styles);

const MaskedInput = (props: InputBaseComponentProps) => {
    return (
        <InputMask 
        mask="(999) 999-9999" 
        alwaysShowMask 
        name={props.name}
        value={props.value} 
        onChange={props.onChange}>
            {(inputProps: any) => <input type="tel" { ...inputProps } className={props.className} />}
        </InputMask>
    );
}

const TextField = (props: Omit<OutlinedTextFieldProps, 'variant'>) => {
    const { InputProps, ...otherProps } = props;
    const classes = useStyles();

    // Use masked input component for phone number
    const useMaskedInput = otherProps.type === 'tel';

    return (
        <MUITextField
        variant="outlined"
        InputProps={{
            classes: {
                root: classes.inputRoot,
                focused: classes.inputFocused
            },
            ...useMaskedInput && { inputComponent: MaskedInput },
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