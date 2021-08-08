import React, { useState, useEffect } from 'react';

import type { PlusMinusInputProps } from './index';

import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';
import styles from './PlusMinusInput.styles';
const useStyles = makeStyles(styles);

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

    const classes = useStyles({ inputLength: `${value}`.length });

    return (
        <div className={`${classes.container} ${props.containerClass}`}>
            <TextField
            value={value}
            onChange={handleChange}
            fullWidth
            inputProps={{ inputMode: 'numeric' }}
            InputProps={{
                disableUnderline: true,
                classes: {
                    root: classes.inputRoot,
                    input: classes.input
                },
                endAdornment: (
                    <InputAdornment position="end">
                        {props.getLabel(+value)}
                    </InputAdornment>
                ),
                ...props.inputProps
            }} />
            <div className={classes.buttons}>
                <AddCircleIcon className={classes.button} onClick={handleInc} />
                <RemoveCircleIcon className={classes.button} onClick={handleDec} />
            </div>
        </div>
    );
}

export default PlusMinusInput;