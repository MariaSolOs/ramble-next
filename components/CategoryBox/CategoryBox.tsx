import useLanguageContext from 'context/languageContext';
import type { ExperienceCategory } from 'graphql-server/sdk';
import type { CategoryBoxProps } from './index';

import Image from 'next/image';
import tasteIcon from 'public/images/category-taste.svg';
import createIcon from 'public/images/category-create.svg';
import relaxIcon from 'public/images/category-relax.svg';
import learnIcon from 'public/images/category-learn.svg';
import moveIcon from 'public/images/category-move.svg';
import * as S from './CategoryBox.styled';

type CategoryInfo = {
    icon: string;
    backgroundColor: string;
    backgroundImage: string;
}

const categories: Record<ExperienceCategory, CategoryInfo> = {
    taste: {
        icon: tasteIcon,
        backgroundColor: '#FBAB7E',
        backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)'
    },
    create: {
        icon: createIcon,
        backgroundColor: '#FF9A8B',
        backgroundImage: 'linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)'
    },
    relax: {
        icon: relaxIcon,
        backgroundColor: '#8BC6EC',
        backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)'
    },
    learn: {
        icon: learnIcon,
        backgroundColor: '#06BEB6',
        backgroundImage: 'linear-gradient(to right, #48B1BF, #06BEB6)'
    },
    move: {
        icon: moveIcon,
        backgroundColor: '#FF416C', 
        backgroundImage: 'linear-gradient(to right, #FF4B2B, #FF416C)'
    }
} as const;

const CategoryBox = (props: CategoryBoxProps) => {
    const { CategoryBox: text } = useLanguageContext().appText;

    const category = {
        ...categories[props.category],
        title: text[props.category]
    }

    // Use default components or provided ones
    const Icon = props.iconComponent || S.Icon;
    const Title = props.titleComponent || S.Title;

    return (
        <S.Box 
        backgroundColor={category.backgroundColor} 
        backgroundImage={category.backgroundImage} 
        iconLocation={props.iconLocation}
        className={props.className}
        { ...props.divProps }>
            <Icon iconLocation={props.iconLocation}>
                <Image
                src={category.icon}
                alt={category.title}
                priority
                width={25}
                height={25} />
            </Icon>
            <Title>{category.title}</Title>
        </S.Box>
    );
}

export default CategoryBox;