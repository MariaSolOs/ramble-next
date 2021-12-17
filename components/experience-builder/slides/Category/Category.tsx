import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import { ExperienceCategory } from 'graphql-server/sdk';
import type { CategoryProps } from './index';

import * as S from './Category.styled';

const EXPERIENCE_CATEGORIES = Object.values(ExperienceCategory).filter(val =>
    isNaN(+val) 
);
const NUM_STEPS = 2;

const Category = (props: CategoryProps) => {
    const { BuilderSlides_Category: text } = useLanguageContext().appText;
    
    const { onSlideComplete, categories } = props;
    useEffect(() => {
        onSlideComplete(
            Boolean(categories[0])
        );
    }, [onSlideComplete, categories]);

    // The slide is defined on whether we're selecting the 1st or 2nd category
    const slide = Math.min(categories.length + 1, 2);

    return (
        <>
            <S.Title>
                {text.title}
                <S.GreyCaps>{`${slide} ${text.of} ${NUM_STEPS}`}</S.GreyCaps>
            </S.Title>
            <S.Subtitle>
                {slide === 1 ? text.question1 : text.question2}
            </S.Subtitle>
            {slide === 2 && <S.Tip >{text.tip}</S.Tip>}
            <S.Categories>

                {EXPERIENCE_CATEGORIES.map(category => {
                    const isSelected = categories.includes(category);

                    return (
                        <S.Category
                        key={uuid()}
                        category={category} 
                        iconLocation="top"
                        isSelected={isSelected}
                        iconComponent={S.CategoryIcon}
                        titleComponent={S.CategoryTitle}
                        divProps={{
                            // If the category was selected, unselect it
                            onClick: () => props.onSelectCategory(category, isSelected)
                        }} />
                    );
                })}
            </S.Categories>
        </>
    );
}

export default Category;