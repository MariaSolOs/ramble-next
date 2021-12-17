import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import { SettingProps } from './index';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';
import * as S from './Setting.styled';

const Setting = (props: SettingProps) => {
    const { BuilderSlides_Setting: text} = useLanguageContext().appText;

    const { onSlideComplete, isOnlineExperience } = props;
    useEffect(() => {
        onSlideComplete(typeof isOnlineExperience !== 'undefined');
    }, [onSlideComplete, isOnlineExperience]);

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle sx={{ m: '8px 0' }}>{text.subtitle}</S.Subtitle>
            <S.TypeBoxes>
                <S.TypeBox 
                selected={isOnlineExperience === false}
                onClick={() => props.onSelectType(false)}>
                    <S.TypeBoxHeader>
                        <EmojiPeopleIcon sx={{ mr: 1.25, fontSize: '1.7rem' }} />
                        {text.inPerson}
                    </S.TypeBoxHeader>
                    <S.TypeBoxDivider />
                    <S.TypeBoxMessage>{text.inPersonOption}</S.TypeBoxMessage>
                </S.TypeBox>
                <S.TypeBox 
                selected={isOnlineExperience === true}
                onClick={() => props.onSelectType(true)}>
                    <S.TypeBoxHeader>
                        <S.OnlineIcon icon={faLaptop} />
                        {text.online}
                    </S.TypeBoxHeader>
                    <S.TypeBoxDivider />
                    <S.TypeBoxMessage>{text.onlineOption}</S.TypeBoxMessage>
                </S.TypeBox>
            </S.TypeBoxes>
        </>
    );
}

export default Setting;