import type { InputBaseProps } from '@mui/material/InputBase';

import PlusMinusInput from './PlusMinusInput';

export type PlusMinusInputProps = {
    InputProps?: Partial<InputBaseProps>;
    value: number;
    minValue?: number;
    maxValue?: number;
    step: number;
    getLabel: (val: number) => string;
    onValueChange: (val: number) => void;
    className?: string;
}

export default PlusMinusInput;