import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { TitleProps } from './index';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from 'components/TextField';
import * as S from './Title.styled';

const MAX_LENGTH = 50;

const Title = (props: TitleProps) => {
    const { BuilderSlides_Title: text } = useLanguageContext().appText;

    const { title, onSlideComplete } = props;
    useEffect(() => {
        const length = title.trim().length;
        onSlideComplete(length > 0 && length <= MAX_LENGTH);
    }, [title, onSlideComplete]);

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <S.Tip>{text.tip}</S.Tip>
            <TextField
            value={title}
            required
            fullWidth
            onChange={e => {
                const value = e.target.value;
                if (value.length <= MAX_LENGTH) {
                    props.onTitleChange(value);
                }
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {MAX_LENGTH - title.length}
                    </InputAdornment>
                )
            }} /> 
        </>
    );
}

export default Title;