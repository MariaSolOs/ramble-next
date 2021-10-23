import React from 'react';
import type { OutlinedTextFieldProps } from '@mui/material/TextField';
import type { InputBaseComponentProps } from '@mui/material/InputBase';

import InputMask from 'react-input-mask';
import * as S from './TextField.styled';

// TODO: Try to fix findDomNode warning
const MaskedInput = React.forwardRef<HTMLInputElement, InputBaseComponentProps>(function MaskedInput(props, ref) {
    return (
        <InputMask 
        mask="(999) 999-9999" 
        alwaysShowMask 
        name={props.name}
        value={props.value} 
        onChange={props.onChange}>
            {(inputProps: any) => <input ref={ref} type="tel" { ...inputProps } className={props.className} />}
        </InputMask>
    );
});

const TextField = (props: Omit<OutlinedTextFieldProps, 'variant'>) => {
    const { InputProps, ...otherProps } = props;

    // Use masked input component for phone number
    const useMaskedInput = otherProps.type === 'tel';

    return (
        <S.TextField
        variant="outlined"
        error={Boolean(otherProps.helperText)}
        InputProps={{
            ...useMaskedInput && { 
                inputComponent: MaskedInput
            },
            ...InputProps
        }}
        { ...otherProps } />
    );
}

export default TextField;