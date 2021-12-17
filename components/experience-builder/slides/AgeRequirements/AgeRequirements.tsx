import { ChangeEvent, useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { AgeRequirementsProps } from './index';

import Tip from 'components/Tip';
import Checkbox from 'components/Checkbox';
import PersonIcon from '@mui/icons-material/Person';
import * as S from './AgeRequirements.styled';

const AgeRequirements = (props: AgeRequirementsProps) => {
    const { BuilderSlides_AgeRequirements: text } = useLanguageContext().appText;

    const { onSlideComplete } = props;
    useEffect(() => {
        /* There's no validation here. If they skip the slide, there's
           no restriction. If they say yes and don't modify the age,
           by default the age required is 18. */
        onSlideComplete(true);
    }, [onSlideComplete]);

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <Tip>{text.tip}</Tip>
            <S.Checkboxes>
                <S.CheckboxField>
                    <Checkbox
                    checked={props.isAgeRestricted}
                    onChange={(_: ChangeEvent, checked: boolean) => {
                        if (checked) {
                            props.onAgeRestrictionChange(true);
                        }
                    }} />
                    <label>{text.yes}</label>
                </S.CheckboxField>
                <S.CheckboxField>
                    <Checkbox
                    checked={!props.isAgeRestricted}
                    onChange={(_: ChangeEvent, checked: boolean) => {
                        if (checked) {
                            props.onAgeRestrictionChange(false);
                        }
                    }} />
                    <label>{text.no}</label>
                </S.CheckboxField>
            </S.Checkboxes>
            {props.isAgeRestricted &&
            <>
                <S.GreyCaps>{text.title}</S.GreyCaps>
                <S.PlusMinus
                value={props.ageRequired}
                step={1}
                onValueChange={props.onAgeRequiredChange}
                getLabel={() => text.yearsOld}
                InputProps={{
                    startAdornment: <PersonIcon />
                }} />
            </>} 
        </>
    );
}

export default AgeRequirements;