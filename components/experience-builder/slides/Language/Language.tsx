import React, { useEffect } from 'react';
import type { AutocompleteChangeReason } from '@mui/material/Autocomplete';

import useLanguageContext from 'context/languageContext';
import type { LanguageProps } from './index';

import Chip from '@mui/material/Chip';
import Autocomplete from 'components/Autocomplete';
import * as S from './Language.styled';

const MAX_LANGUAGES = 3;

const Language = (props: LanguageProps) => {
    const { BuilderSlides_Language: text } = useLanguageContext().appText;

    const handleChange = (_: React.ChangeEvent<{}>, value: string[], reason: AutocompleteChangeReason) => {
        // Make sure user selects 3 languages max
        if ((reason === 'selectOption' && value.length <= MAX_LANGUAGES) ||
             reason === 'removeOption' || reason === 'clear') {
            props.onLanguagesChange(value);
        }
    }

    const { languages, onSlideComplete } = props;
    useEffect(() => {
        const numLanguges = languages.length;
        onSlideComplete(numLanguges > 0 && numLanguges <= MAX_LANGUAGES);
    }, [languages, onSlideComplete]);

    const disableSelection = languages.length >= MAX_LANGUAGES;

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <S.Tip>{text.tip}</S.Tip>
            <Autocomplete
            multiple
            filterSelectedOptions
            PaperComponent={S.Paper}
            options={disableSelection ? [] : props.languageList}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  // Disable key error because getTagProps adds the key
                  // eslint-disable-next-line react/jsx-key
                  <Chip label={option} {...getTagProps({ index })} />
                ))
            }
            // The loading feature is used to disable further selection
            loading={disableSelection}
            loadingText={text.maxLanguagesMessage}
            value={props.languages}
            onChange={handleChange}
            isOptionEqualToValue={(option: string, value: string) => 
                value.includes(option)
            } />
        </>
    );
}

export default Language;