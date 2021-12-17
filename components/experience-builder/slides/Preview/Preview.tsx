import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import type { PreviewProps } from './index';

import Tip from 'components/Tip';
import * as S from './Preview.styled';

const Preview = (props: PreviewProps) => {
    const { BuilderSlides_Preview: text } = useLanguageContext().appText;

    const { images, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(
            images.length === 4 &&
            images.every(img => img)
        );
    }, [onSlideComplete, images]);

    return (
        <>  
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle}</S.Subtitle>
            <Tip>{text.tip}</Tip>
            <S.DropzoneContainer>
                {[
                    { title: text.coverImgTitle, description: text.coverImgText },
                    { title: text.creatorImgTitle, description: text.creatorImgText },
                    { title: text.actionImgTitle, description: text.actionImgText },
                    { title: text.locationImgTitle, description: text.locationImgText }
                ].map(({ title, description }, idx) => 
                    <S.DropzoneItem key={uuid()}>
                        <S.PictureTitle>{title}</S.PictureTitle>
                        <S.PictureDescription>{description}</S.PictureDescription>
                        <S.Dropzone
                        image={images[idx]}
                        onFileDrop={file => props.onImageChange(idx, file)}
                        addButton={S.AddButton}
                        deleteButton={S.DeleteButton} />
                    </S.DropzoneItem>
                )}
            </S.DropzoneContainer>
        </>
    );
}

export default Preview;