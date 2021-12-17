import { useEffect, useCallback } from 'react';

import useLanguageContext from 'context/languageContext';
import type { DurationProps } from './index';

import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import * as S from './Duration.styled';

// Duration is increased/decreased by 30 minutes
const DURATION_STEP = 0.5;

const Duration = (props: DurationProps) => {
    const { BuilderSlides_Duration: text } = useLanguageContext().appText;

    const { duration, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(duration >= DURATION_STEP);
    }, [duration, onSlideComplete]);

    // To format the time nicely
    const getDurationText = useCallback(() => {
        const hours = Math.floor(duration);
        const minutes = duration - Math.floor(duration);

        if (hours === 0) { 
            return '30 minutes'; 
        }

        const hoursLabel = hours > 1 ? text.hours : text.hour;
        const minutesLabel = minutes === 0 ? '' : text.halfHour;
        return (`${hours} ${hoursLabel} ${minutesLabel}`);
    }, [duration, text]);

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <S.Tip>{text.tip}</S.Tip>
            <Box sx={{ display: 'flex' }}>
                <S.TextField readOnly value={getDurationText()} />
                <S.FieldButtons>
                    <S.FieldButton 
                    component={AddCircleIcon} 
                    onClick={() => props.onDurationChange(duration + DURATION_STEP)} />
                    <S.FieldButton 
                    component={RemoveCircleIcon} 
                    onClick={() => {
                        // When decreasing, make sure the minimum is 30 minutes
                        if (duration >= 1) {
                            props.onDurationChange(duration - DURATION_STEP);
                        }
                    }} />
                </S.FieldButtons>
            </Box>
        </>
    );
}

export default Duration;