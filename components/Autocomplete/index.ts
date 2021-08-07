import type { AutocompleteProps as MuiProps } from '@material-ui/lab/Autocomplete';
import type { StandardTextFieldProps, InputBaseProps } from '@material-ui/core';

import Autocomplete from './Autocomplete';

export interface AutocompleteProps extends Omit<MuiProps<any, any, any, any>, 'renderInput'> {
    textfieldprops?: Partial<StandardTextFieldProps>;
    inputprops?: Partial<InputBaseProps>;
    paperclass?: string;
}

export default Autocomplete;