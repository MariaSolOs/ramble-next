import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { CapacityProps } from './index';

import * as S from './Capacity.styled';

const Capacity = (props: CapacityProps) => {
    const { BuilderSlides_Capacity: text } = useLanguageContext().appText;

    const { capacity, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(capacity >= 1);
    }, [capacity, onSlideComplete]);

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <S.Tip>{text.tip}</S.Tip>
            <S.CapacityField
            value={capacity}
            minValue={1}
            step={1}
            onValueChange={props.onCapacityChange}
            getLabel={val => val > 1 ? text.people : text.person} />
        </>
    );
}

export default Capacity;