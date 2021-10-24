import React, { useState, useEffect } from 'react';

import type { PlusMinusInputProps } from './index';

import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import * as S from './PlusMinusInput.styled';

const PlusMinusInput = (props: PlusMinusInputProps) => {    
    const [value, setValue] = useState<number | ''>(props.value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setValue('');
            return;
        }

        const numericValue = +e.target.value;
        if (!isNaN(numericValue) && 
           (!props.maxValue || numericValue <= props.maxValue) &&
           (!props.minValue || numericValue >= props.minValue)) {
            setValue(numericValue);
        }
    }

    const handleInc = () => {
        const newValue = +value + props.step;
        if (!props.maxValue || newValue <= props.maxValue) {
            setValue(newValue);
        }
    }

    const handleDec = () => {
        const newValue = +value - props.step;
        if (!props.minValue || newValue >= props.minValue) {
            setValue(newValue);
        }
    }

    // If the parent has a different value, update it
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    // Report change to parent component
    useEffect(() => {
        props.onValueChange(+value);
        /* onValueChange is not added to the dependency array because
           it should never change. */
        // eslint-disable-next-line
    }, [value]);

    return (
        <Box sx={{ display: 'flex' }} className={props.className}>
            <S.InputBase
            value={value}
            onChange={handleChange}
            fullWidth
            inputLength={`${value}`.length}
            inputProps={{ inputMode: 'numeric' }}
            endAdornment={
                <S.InputAdornment position="end">
                    {props.getLabel(+value)}
                </S.InputAdornment>
            }
            { ...props.InputProps } />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <S.Button as={AddCircleIcon} onClick={handleInc} />
                <S.Button as={RemoveCircleIcon} onClick={handleDec} />
            </Box>
        </Box>
    );
}

export default PlusMinusInput;