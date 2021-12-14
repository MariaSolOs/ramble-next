import useLanguageContext from 'context/languageContext';
import { MAX_CREATOR_BIO_LENGTH } from 'global-constants';
import type { FormProps } from './index';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import * as S from './Form.styled';

const Form = (props: FormProps) => {
    const { CreatorForm: text } = useLanguageContext().appText;

    return (
        <Box sx={{ width: '100vw', pt: '100px', backgroundColor: '#000' }}>
            <S.FormContent>
                <S.Header>
                    <S.HeaderGradient />
                    <div>
                        <S.Title>{props.creatorName},</S.Title>
                        <S.Subtitle>{text.headerTitle}</S.Subtitle>
                    </div>
                </S.Header>
                {props.showDropzone &&
                    <>
                        <div>
                            <S.Title>{text.profilePicture}</S.Title>
                            <S.Subtitle>{text.showSmile}</S.Subtitle>
                        </div>
                        <S.PhotoDropzone
                        image={props.photo}
                        addButton={S.AddIcon}
                        deleteButton={S.DeleteIcon}
                        onFileDrop={props.onPhotoChange} />
                    </>}
                <S.FieldContainer>
                    <S.Title>{text.aboutYouTitle}</S.Title>
                    <S.Subtitle>{text.aboutYouSubtitle}</S.Subtitle>
                    <S.Tip>{text.aboutYouTip}</S.Tip>
                    <S.AboutYouTextField
                    multiline
                    minRows={4}
                    maxRows={4}
                    required
                    value={props.bio}
                    onChange={e => {
                        if (e.target.value.length <= MAX_CREATOR_BIO_LENGTH) {
                            props.onBioChange(e.target.value);
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={{ color: 'inherit' }}>
                                {MAX_CREATOR_BIO_LENGTH - props.bio.length}
                            </InputAdornment>
                        )
                    }} />
                </S.FieldContainer>
                <S.Title>{text.phoneNumberTitle}</S.Title>
                <S.Subtitle>{text.phoneNumberSubtitle}</S.Subtitle>
                <S.PhoneTextField
                required
                type="tel"
                value={props.phoneNumber}
                onChange={e => props.onPhoneNumberChange(e.target.value)} />
                <S.FieldContainer>
                    <S.Title>{text.idTitle}</S.Title>
                    <S.Subtitle>{text.idSubtitle}</S.Subtitle>
                    <S.Tip icon={faLock}>{text.idTip1}</S.Tip>
                    <S.Tip>{text.idTip2}</S.Tip>
                    <S.IdsContainer>
                        <S.IdDropzoneContainer>
                            <S.IdDropzoneTitle>{text.front}</S.IdDropzoneTitle>
                            <S.IdDropzoneSubtitle>{text.frontIdText}</S.IdDropzoneSubtitle>
                            <S.IdDropzone
                            addButton={S.AddIcon}
                            deleteButton={S.DeleteIcon}
                            image={props.frontId}
                            onFileDrop={props.onFrontIdChange}>
                                <S.IdDropzoneText>{text.addFront}</S.IdDropzoneText>
                            </S.IdDropzone>
                        </S.IdDropzoneContainer>
                        <S.IdDropzoneContainer>
                            <S.IdDropzoneTitle>{text.back}</S.IdDropzoneTitle>
                            <S.IdDropzoneSubtitle>{text.backIdText}</S.IdDropzoneSubtitle>
                            <S.IdDropzone
                            addButton={S.AddIcon}
                            deleteButton={S.DeleteIcon}
                            image={props.backId}
                            onFileDrop={props.onBackIdChange}>
                                <S.IdDropzoneText>{text.addBack}</S.IdDropzoneText>
                            </S.IdDropzone>
                        </S.IdDropzoneContainer>
                    </S.IdsContainer>
                </S.FieldContainer>
            </S.FormContent>
            <S.Footer>
                <S.DoneButton 
                type="submit"
                variant="creator"
                disabled={props.submitDisabled}>
                    {text.done}
                </S.DoneButton>
            </S.Footer>
        </Box>
    );
}

export default Form;