import type { TipProps } from './index';

import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import * as S from './Tip.styled';

const Tip: React.FC<TipProps> = (props) => (
    <S.Tip className={props.className}>
        <S.Icon icon={props.icon || faLightbulb} />
        {props.children}
    </S.Tip>
);

export default Tip;