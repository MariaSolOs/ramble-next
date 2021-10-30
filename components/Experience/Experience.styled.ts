import { styled } from '@mui/material/styles';
import type { Theme as BaseTheme } from '@mui/material/styles';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import MuiRating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryBox from 'components/CategoryBox';

// Define the augmentation only where the scope is valid
export interface Theme extends BaseTheme { 
    isPreview: boolean;
    isAgeRestricted: boolean;
}

export const Carousel = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        '& .experience-carousel': {
            maxWidth: theme.isPreview ? '90%' : 480,
            margin: theme.isPreview ? '10px auto 0' : '20px 15px 0 30px',
    
            ...!theme.isPreview && {
                [theme.breakpoints.down('md')]: {
                    maxWidth: '90%',
                    margin: '10px auto 0'
                }
            },
    
            '& .thumbnail-wrapper, & .main-image-wrapper': { position: 'relative' },
            
            '& .main-image-wrapper > div, & .thumbnail-wrapper > div': { 
                position: 'unset !important' 
            },
    
            '& .image-gallery-slide': {
                '&:focus': { outline: 'none' },
    
                '& .image-gallery-image': { 
                    height: theme.isPreview ? 320 : 460,
                    objectFit: 'cover',
    
                    ...!theme.isPreview && {
                        [theme.breakpoints.down('md')]: { height: 'calc(70vh - 70px)' },
                        [theme.breakpoints.down('sm')]: { height: 'calc(55vh - 70px)' }
                    }
                },
            },
    
            '& .main-image': {
                width: 'unset !important',
                height: `${theme.isPreview ? 320 : 460}px !important`,
                position: 'unset !important',
    
                ...!theme.isPreview && {
                    [theme.breakpoints.down('md')]: { height: 'calc(70vh - 70px) !important' },
                    [theme.breakpoints.down('sm')]: { height: 'calc(55vh - 70px) !important' }
                }
            },
    
            '& .image-gallery-thumbnail, & .thumbnail-wrapper': {
                transform: 'none',
                border: 'none !important',
                cursor: 'pointer',
    
                '& .image-gallery-thumbnail-image': { 
                    maxHeight: `calc(${theme.isPreview ? '70% - 70px' : '460px / 3'})`,
    
                    ...!theme.isPreview && {
                        [theme.breakpoints.down('md')]: { maxHeight: 'calc((70vh - 70px) / 3)' }
                    }
                }
            },
    
            '& .thumbnail': {
                width: '100px !important',
                height: 'unset !important',
                position: 'unset !important',
                maxHeight: `calc(${theme.isPreview ? '70% - 70px' : '460px / 3'})`,
    
                ...!theme.isPreview && {
                    [theme.breakpoints.down('md')]: { maxHeight: 'calc((70vh - 70px) / 3)' }
                }
            },
    
            '& .image-gallery-bullets': { 
                bottom: theme.isPreview ? -20 : -30,
                ...!theme.isPreview && {
                    [theme.breakpoints.down('sm')]: { bottom: -20 }
                },
    
                '& .image-gallery-bullet': {
                    backgroundColor: '#4F4F4F',
                    margin: `0 ${theme.isPreview ? 2 : 3}px`,
                    padding: theme.isPreview ? 5 : 6.5,
                    border: 'none',
                    '&:hover': { 
                        border: 'none',
                        outline: 'none',
                        backgroundColor: '#FFF'
                    },
                    '&:focus': { outline: 'none' },
                    '&.active': { 
                        backgroundColor: '#FFF',
                        transform: 'none',
                        '&:hover': { backgroundColor: '#FFF' }
                    },
    
                    ...!theme.isPreview && {
                        [theme.breakpoints.down('sm')]: { 
                            padding: 5,
                            margin: '0 2px'
                        }
                    }
                } 
            }
        }
    }
});

export const Body = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        marginTop: theme.isPreview ? 30 : 20,
        width: theme.isPreview ? '95%' : 'calc(100% - 480px)',
        
        ...!theme.isPreview && {
            overflowY: 'scroll',
            paddingBottom: 70,
        
            [theme.breakpoints.down('lg')]: { width: 'calc(100% - 520px)' },
            [theme.breakpoints.down('md')]: { 
                width: '85vw',
                marginTop: 30
            },
            [theme.breakpoints.down('sm')]: { width: '95vw' }
        }
    }
}); 

export const MainInfos = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        width: theme.isPreview ? '100%' : 500,
        display: 'flex',
        justifyContent: 'space-between',
    
        ...!theme.isPreview && {
            [theme.breakpoints.down('lg')]: { width: 450 },
            [theme.breakpoints.down('md')]: { width: '100%' }
        }
    }
});

export const OnlineBadge = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        width: theme.isPreview ? 60 : 75,
        padding: theme.isPreview ? 3 : 4,
        color: '#2D2E2E',
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        borderRadius: 5,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: theme.isPreview ? '0.55rem' : '0.6rem',
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightBold,
    
        ...!theme.isPreview && {
            [theme.breakpoints.down('sm')]: {
                width: 65,
                fontSize: '0.55rem'
            }
        }
    }
});

export const Title = styled('h1')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        margin: 0,
        lineHeight: 1.2,
        ...theme.isPreview ? { fontSize: '1.15rem' } : { 
            [theme.breakpoints.down('sm')]: { fontSize: '1.15rem' } 
        }
    }
});

export const Location = styled('h3')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        margin: 0,
        ...theme.isPreview ? { fontSize: '0.85rem' } : { 
            [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' } 
        }
    }
});

export const Rating = styled('p')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        alignItems: 'center',
        display: 'flex',
        margin: theme.isPreview ? 0 : '8px 0 0',
        fontSize: theme.isPreview ? '0.9rem' : '1.1rem',
        
        ...!theme.isPreview && {
            [theme.breakpoints.down('sm')]: {
                margin: 0,
                fontSize: '0.9rem'
            }
        }
    }
});

export const NumRatings = styled('span')(({ theme }) => ({
    fontSize: '0.9rem',
    marginLeft: 10,
    color: '#BFBFBF',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.75rem' }
}));

export const ShareSaveContainer = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        display: 'flex',
        ...theme.isPreview ? {
            margin: 0,
            width: 68
        } : {
            marginTop: 33,
            [theme.breakpoints.down('sm')]: {
                margin: 0,
                width: 68
            }
        }
    }
});

export const ShareSaveFab = styled(Fab)(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        marginLeft: theme.isPreview ? 4 : 5,
        backgroundColor: '#656565',
        '&:hover': { backgroundColor: '#656565' },

        ...theme.isPreview ? {
            width: 30,
            height: 30,
            minHeight: 0
        } : {
            [theme.breakpoints.down('sm')]: {
                width: 30,
                height: 30,
                minHeight: 0,
                marginLeft: 4
            }
        }
    }
});

export const ShareSaveIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    fontSize: '1.2rem',
    color: 'whitesmoke',

    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const Category = styled(CategoryBox)(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        height: theme.isPreview ? 26 : 35,
        width: theme.isPreview ? 90 : 130,
        fontSize: theme.isPreview ? '0.7rem' : '0.9rem',
        marginRight: 20,

        ...!theme.isPreview && {
            [theme.breakpoints.down('sm')]: {
                height: 26,
                width: 90,
                fontSize: '0.7rem'
            }
        }
    }
});

export const QuickInfos = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        backgroundColor: '#1C1C1C',
        borderRadius: '1rem',
        display: 'flex',
        padding: 8,
        margin: theme.isPreview ? '1.5rem auto' : '1.3rem 0 0.5rem',

        ...theme.isPreview ? {
            maxWidth: '100%'
        } : {
            width: 500,
            [theme.breakpoints.down('lg')]: { width: 450 },
            [theme.breakpoints.down('md')]: { margin: '1.5rem auto' },
            [theme.breakpoints.down('sm')]: { maxWidth: '100%' }
        }
    }
});

export const QuickInfoColumn = styled('span')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: theme.isAgeRestricted ? '25%' : '33%',

        '&:nth-of-type(3)': { // Allow language column to wrap
            whiteSpace: 'pre-line' 
        }
    }
});

export const QuickInfoCircle = styled('div')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        backgroundColor: '#1C1C1C',
        borderRadius: '50%',
        position: 'absolute',
        top: theme.isPreview ? -20 : -23,
        left: `calc(50% - ${theme.isPreview ? 11 : 13}px)`,
        height: theme.isPreview ? 22 : 26,
        width: theme.isPreview ? 22 : 26,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        ...!theme.isPreview && {
            [theme.breakpoints.down('sm')]: {
                top: -20,
                left: 'calc(50% - 11px)',
                height: 22,
                width: 22,
            }
        }
    }
});

export const QuickInfoIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    color: '#717171',
    fontSize: '1rem',

    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
}));

export const QuickInfoText = styled('span')(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        fontSize: theme.isPreview ? '0.8rem' : '1rem',
        color: '#DDD',
        textTransform: 'capitalize',
        textAlign: 'center',

        ...!theme.isPreview && {
            [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
        }
    }
});

export const QuickInfoLabel = styled(QuickInfoText)(({ theme: baseTheme }) => {
    const theme = baseTheme as Theme;

    return {
        fontSize: theme.isPreview ? '0.8rem' : '0.9rem',
        color: '#717171',
        textTransform: 'uppercase'
    }
});

export const SectionLabel = styled('h3')({
    fontSize: '1.15rem',
    margin: '10px 0 0'
});

export const DarkButton = styled('button')(({ theme }) => ({
    backgroundColor: '#242424',
    borderRadius: '0.5rem',
    color: '#ECEBE5',
    fontSize: '0.9rem',
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: '-0.05rem',
    border: 'none',
    marginLeft: 15,
    padding: '0.6rem 0.9rem',
    width: 130
}));

export const BodyText = styled(Box)({
    width: '100%',
    fontSize: '0.97rem',
    color: '#C8C8C8',
    lineHeight: 1.4,
    margin: '5px 0'
});

export const ItemList = styled('ul')({
    fontSize: '1rem',
    color: '#C8C8C8',
    listStylePosition: 'inside',
    padding: 0,
    marginTop: '0.5rem',
    textTransform: 'capitalize'
});

export const Map = styled('div')({
    maxWidth: 500,
    marginTop: 10,
    borderRadius: '1.7rem',
    overflow: 'hidden',
    position: 'relative',
    height: 300,
    color: '#FFF',
    backgroundColor: '#1C1C1C'
});

export const ReviewDivisor = styled('div')({
    backgroundColor: 'rgba(197, 197, 197, 0.4)',
    width: '40%',
    padding: '0.5px 0',
    marginTop: '1.5rem'
});

export const ShowReviewsButton = styled('button')(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold,
    color: '#FFF',
    backgroundColor: 'transparent',
    border: 'none',
    letterSpacing: '-0.05rem',
    fontSize: '1rem',
    position: 'absolute',
    top: 0,
    right: 10,

    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
        top: 5
    }
}));

export const ReviewTitle = styled('h4')({
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0 0'
});

export const ReviewStars = styled(MuiRating)({
    color: '#FFF',
    marginLeft: '1.5rem',
    
    '& .MuiRating-iconEmpty': { stroke: '#FFF' }
});