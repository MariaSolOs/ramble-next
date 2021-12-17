import { styled } from '@mui/material/styles';

import type { CategoryBoxProps } from 'components/CategoryBox';

import BaseTip from 'components/Tip';
import CategoryBox, { 
    TitleComponent as CategoryBaseTitle, 
    IconComponent as CategoryBaseIcon 
} from 'components/CategoryBox';

export * from 'components/experience-builder/slides/Shared.styled';

export const GreyCaps = styled('span')(({ theme }) => ({
    color: '#CDCDCD',
    textTransform: 'uppercase',
    fontSize: '1rem',
    margin: '0 1rem',

    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const Categories = styled('div')(({ theme }) => ({
    display: 'flex',
    width: 480,
    flexWrap: 'wrap',
    margin: '40px 0 0 -10px',
    
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '30px auto 0 1.9vw'
    }
}));

export const Category = styled(CategoryBox, {
    shouldForwardProp: prop => prop !== 'isSelected'
})<CategoryBoxProps & { isSelected: boolean; }>(({ theme, isSelected }) => ({
    width: 150,
    height: 150,
    margin: '0 0 10px 10px',
    cursor: 'pointer',

    '&:hover': {
        filter: 'brightness(50%)',
        transition: '300ms ease-in-out',
    },

    ...isSelected && { filter: 'brightness(50%)' },
    
    [theme.breakpoints.down('sm')]: {
        width: '29.45vw',
        height: '29.45vw',
        margin: '0 1.9vw 1.9vw 0'
    }
}));

export const CategoryTitle = styled(CategoryBaseTitle)(({ theme }) => ({
    fontSize: '1.15rem',
    margin: '5px 0',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.95rem' }
}));

export const CategoryIcon = styled(CategoryBaseIcon)(({ theme }) => ({
    height: 30,
    
    [theme.breakpoints.down('sm')]: { height: 25 }
}));

export const Tip = styled(BaseTip)(({ theme }) => ({
    margin: '5px 0 0',

    [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' }
}));