import type { CheckboxProps } from '@mui/material/Checkbox';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import * as S from './Checkbox.styled';

const Checkbox = (props: CheckboxProps) => (
    <S.Checkbox
    icon={<RadioButtonUncheckedIcon />}
    checkedIcon={<FiberManualRecordIcon />}
    disableRipple
    { ...props } />
);

export default Checkbox;