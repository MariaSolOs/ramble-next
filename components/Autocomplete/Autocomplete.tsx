import type { AutocompleteProps } from './index';

import MuiAutocomplete from '@mui/material/Autocomplete';
import * as S from './Autocomplete.styled';

const Autocomplete = (props: AutocompleteProps) => {
    const { TextFieldProps, InputProps, ...otherProps } = props;

    return (
        <MuiAutocomplete
        PaperComponent={S.Paper}
        renderInput={params => (
            <S.TextField
            { ...params }
            { ...TextFieldProps }
            variant="outlined"
            InputProps={{
                ...params.InputProps,
                ...InputProps
            }} />
        )}
        { ...otherProps} />
    );
}

export default Autocomplete;