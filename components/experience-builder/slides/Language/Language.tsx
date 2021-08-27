import React, { useEffect } from 'react';
import type { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';

import useLanguageContext from 'context/languageContext';
import type { LanguageProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import Tip from 'components/Tip';
import Autocomplete from 'components/Autocomplete';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Language.styles';
const useStyles = makeStyles(styles);

const MAX_LANGUAGES = 3;

const Language = (props: LanguageProps) => {
    const { BuilderSlides_Language: text } = useLanguageContext().appText;
    const classes = useStyles();

    const handleChange = (_: React.ChangeEvent<{}>, value: string[], reason: AutocompleteChangeReason) => {
        // Make sure user selects 3 languages max
        if ((reason === 'select-option' && value.length <= MAX_LANGUAGES) ||
             reason === 'remove-option' || reason === 'clear') {
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
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <Tip className={classes.tip}>{text.tip}</Tip>
            <Autocomplete
            debug
            multiple
            filterSelectedOptions
            paperclass={classes.autocompletePaper}
            options={disableSelection ? [] : props.languageList}
            // The loading feature is used to disable further selection
            loading={disableSelection}
            loadingText={text.maxLanguagesMessage}
            value={props.languages}
            onChange={handleChange}
            getOptionSelected={(option: string, value: string) => 
                value.includes(option)
            } />
        </>
    );
}

export default Language;