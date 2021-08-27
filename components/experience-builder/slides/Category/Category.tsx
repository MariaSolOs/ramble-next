import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import { ExperienceCategory } from 'graphql-server/sdk';
import type { CategoryProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import Tip from 'components/Tip';
import CategoryBox from 'components/CategoryBox';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Category.styles';
const useStyles = makeStyles(styles);

const EXPERIENCE_CATEGORIES = Object.values(ExperienceCategory).filter(val =>
    isNaN(+val) 
);
const NUM_STEPS = 2;

const Category = (props: CategoryProps) => {
    const { BuilderSlides_Category: text } = useLanguageContext().appText;
    const classes = useStyles();
    
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
            <Title>
                {text.title}
                <span className={classes.greyCaps}>
                    {`${slide} ${text.of} ${NUM_STEPS}`}
                </span>
            </Title>
            <Subtitle>
                {slide === 1 ? text.question1 : text.question2}
            </Subtitle>
            {slide === 2 && <Tip className={classes.tip}>{text.tip}</Tip>}
            <div className={classes.categoriesContainer}>
                {EXPERIENCE_CATEGORIES.map(category => {
                    const isSelected = categories.includes(category);

                    return (
                        <CategoryBox
                        key={uuid()}
                        category={category} 
                        iconLocation="top"
                        boxClass={`
                            ${classes.category}
                            ${isSelected && classes.categorySelected}
                        `}
                        iconClass={classes.categoryIcon}
                        titleClass={classes.categoryTitle}
                        divProps={{
                            // If the category was selected, unselect it
                            onClick: () => props.onSelectCategory(category, isSelected)
                        }} />
                    );
                })}
            </div>
        </>
    );
}

export default Category;