import type { AutocompleteProps as MuiProps } from '@mui/material/Autocomplete';
import type { StandardTextFieldProps } from '@mui/material/TextField';
import type { InputBaseProps } from '@mui/material/InputBase';

import Autocomplete from './Autocomplete';
import { Paper } from './Autocomplete.styled';

export interface AutocompleteProps extends Omit<MuiProps<any, any, any, any>, 'renderInput'> {
    TextFieldProps?: Partial<StandardTextFieldProps>;
    InputProps?: Partial<InputBaseProps>;
}

export { Paper as AutocompletePaper };
export default Autocomplete;