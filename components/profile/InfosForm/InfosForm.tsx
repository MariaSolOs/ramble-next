import useLanguageContext from 'context/languageContext';
import { ProfileFormField as FormField } from 'models/user-interface';
import { MAX_CREATOR_BIO_LENGTH } from 'global-constants';
import type { InfosFormProps } from './index';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from 'components/TextField';
import * as S from './InfosForm.styled';

const InfosForm = (props: InfosFormProps) => {
    const { Profile_PersonalInformation: text } = useLanguageContext().appText;

    return (
        <S.Form onSubmit={props.onSubmit}>
            <S.FormControl>
                <S.Label htmlFor={FormField.FirstName}>{text.firstName}</S.Label>
                <TextField
                id={FormField.FirstName}
                name={FormField.FirstName}
                required
                value={props.values.firstName}
                onChange={props.onChange} />
            </S.FormControl>
            <S.FormControl>
                <S.Label htmlFor={FormField.LastName}>{text.lastName}</S.Label>
                <TextField
                id={FormField.LastName}
                name={FormField.LastName}
                required
                value={props.values.lastName}
                onChange={props.onChange} />
            </S.FormControl>
            <S.FormControl>
                <S.Label htmlFor={FormField.City}>{text.liveIn}</S.Label>
                <TextField
                id={FormField.City}
                name={FormField.City}
                value={props.values.city}
                onChange={props.onChange} />
            </S.FormControl>
            <S.FormControl>
                <S.Label htmlFor={FormField.Email}>{text.email}</S.Label>
                <TextField
                id={FormField.Email}
                name={FormField.Email}
                required
                type="email"
                value={props.values.email}
                onChange={props.onChange} />
            </S.FormControl>
            <S.FormControl>
                <S.Label htmlFor={FormField.PhoneNumber}>{text.phoneNumber}</S.Label>
                <TextField
                id={FormField.PhoneNumber}
                name={FormField.PhoneNumber}
                required={props.isCreator}
                type="tel"
                value={props.values.phoneNumber}
                onChange={props.onChange} />
            </S.FormControl>
            <S.FormControl>
                <S.Label htmlFor={FormField.Birthday}>{text.birthday}</S.Label>
                <TextField
                id={FormField.Birthday}
                name={FormField.Birthday}
                type="date"
                value={props.values.birthday}
                onChange={props.onChange} />
            </S.FormControl>
            {props.isCreator &&
                <S.CreatorBio>
                    <S.Label htmlFor={FormField.CreatorBio}>{text.aboutYou}</S.Label>
                    <TextField
                    id={FormField.CreatorBio}
                    name={FormField.CreatorBio}
                    multiline
                    minRows={4}
                    maxRows={4}
                    required
                    value={props.values.creatorBio}
                    onChange={props.onChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {MAX_CREATOR_BIO_LENGTH - props.values.creatorBio.length}
                            </InputAdornment>
                        )
                    }} />
                </S.CreatorBio>}
            <S.Footer>
                <S.SubmitButton variant="experience" type="submit">
                    {text.submitButton}
                </S.SubmitButton>
            </S.Footer>
        </S.Form>
    );
}

export default InfosForm;