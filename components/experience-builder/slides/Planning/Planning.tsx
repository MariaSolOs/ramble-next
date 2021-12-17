import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { PlanningProps } from './index';

import InputAdornment from '@mui/material/InputAdornment';
import * as S from './Planning.styled';

const MAX_PLANNING_LENGTH = 1000;

const Planning = (props: PlanningProps) => {
    const { BuilderSlides_Planning: text } = useLanguageContext().appText;

    const { planning, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(planning.trim().length > 0);
    }, [planning, onSlideComplete]);

    return (
        <S.Container>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <S.TextField
            fullWidth
            multiline
            rows={4}
            label={text.textfieldLabel}
            value={planning}
            onChange={e => props.onPlanningChange(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" sx={{ color: 'inherit' }}>    
                        {MAX_PLANNING_LENGTH - planning.length}
                    </InputAdornment>
                )
            }} />
        </S.Container>
    );
}

export default Planning;