import type { AutocompleteProps } from './index';

import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Autocomplete.styles';
const useStyles = makeStyles(styles);

const Autocomplete = (props: AutocompleteProps) => {
    const classes = useStyles();

    return (
        <MuiAutocomplete
        classes={{ paper: `${classes.paper} ${props.paperclass}` }}
        getOptionSelected={(option, value) => option.value === value.value}
        renderInput={params => (
            <TextField 
            { ...params }
            { ...props.textfieldprops }
            InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                classes: { root: classes.input },
                ...props.inputprops
            }}/>
        )}
        { ...props } />
    );
}

export default Autocomplete;