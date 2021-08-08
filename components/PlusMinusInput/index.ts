import type { InputBaseProps } from '@material-ui/core/InputBase';

import PlusMinusInput from './PlusMinusInput';

export type PlusMinusInputProps = {
    inputProps?: Partial<InputBaseProps>;
    value: number;
    minValue?: number;
    maxValue?: number;
    step: number;
    getLabel: (val: number) => string;
    onValueChange: (val: number) => void;
    containerClass?: string;
}

export type PlusMinusInputStyleProps = {
    inputLength: number;
}

export default PlusMinusInput;