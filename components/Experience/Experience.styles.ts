import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { ExperienceStyleProps } from './index';

export const desktopStyles = (theme: Theme) => createStyles({
    carousel: {
        maxWidth: 480,
        margin: '20px 15px 0 30px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90%',
            margin: '10px auto 0'
        },

        '& .image-gallery-slide': {
            '&:focus': { outline: 'none' },

            '& .image-gallery-image': { 
                height: 460,
                objectFit: 'cover',
                [theme.breakpoints.down('sm')]: { height: 'calc(70vh - 70px)' },
                [theme.breakpoints.down('xs')]: { height: 'calc(55vh - 70px)' }
            },

            '& .main-image-wrapper > div': {
                position: 'unset !important'
            },

            '& .main-image': {
                width: 'unset !important',
                height: '460px !important',
                position: 'unset !important',
                [theme.breakpoints.down('sm')]: { height: 'calc(70vh - 70px) !important' },
                [theme.breakpoints.down('xs')]: { height: 'calc(55vh - 70px) !important' }
            }
        },

        '& .image-gallery-thumbnail, & .thumbnail-wrapper': {
            transform: 'none',
            border: 'none !important',
            cursor: 'pointer',

            '& .image-gallery-thumbnail-image': { 
                maxHeight: 'calc(460px / 3)',
                [theme.breakpoints.down('sm')]: { maxHeight: 'calc((70vh - 70px) / 3)' }
            }
        },

        '& .thumbnail-wrapper > div': { position: 'unset !important' },

        '& .thumbnail': {
            width: '100px !important',
            height: 'unset !important',
            position: 'unset !important',
            maxHeight: 'calc(460px / 3)',
            [theme.breakpoints.down('sm')]: { maxHeight: 'calc((70vh - 70px) / 3)' }
        },

        '& .image-gallery-bullets': { 
            bottom: -30,
            [theme.breakpoints.down('sm')]: { bottom: -20 },

            '& .image-gallery-bullet': {
                backgroundColor: '#4F4F4F',
                margin: '0 3px',
                padding: 6.5,
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
                    '&:hover': { backgroundColor: '#FFF' },
                },
                [theme.breakpoints.down('xs')]: { 
                    padding: 5,
                    margin: '0 2px'
                }
            } 
        }
    },

    online: {
        width: 75,
        color: '#2D2E2E',
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        borderRadius: 5,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '0.6rem',
        textTransform: 'uppercase',
        padding: 4,
        fontWeight: theme.typography.fontWeightBold,
        [theme.breakpoints.down('xs')]: {
            width: 65,
            fontSize: '0.55rem'
        }
    },

    body: {
        marginTop: 20,
        width: 'calc(100% - 480px)',
        overflowY: 'scroll',
        paddingBottom: 70,
        [theme.breakpoints.down('md')]: { width: 'calc(100% - 520px)' },
        [theme.breakpoints.down('sm')]: { 
            width: '85vw',
            marginTop: 30
        },
        [theme.breakpoints.down('xs')]: { width: '95vw' }
    },

    mainInfos: {
        width: 500,
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: { width: 450 },
        [theme.breakpoints.down('sm')]: { 
            width: '100%',
            justifyContent: 'space-between' 
        }
    },

    title: {
        margin: 0,
        lineHeight: 1.2,
        [theme.breakpoints.down('xs')]: { fontSize: '1.15rem' }
    },

    location: {
        margin: 0,
        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    },

    shareSaveContainer: {
        display: 'flex',
        marginTop: 33,
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            width: 68
        }
    },

    shareSaveButton: {
        marginLeft: 5,
        backgroundColor: '#656565',
        '&:hover': { backgroundColor: '#656565' },

        [theme.breakpoints.down('xs')]: {
            width: 30,
            height: 30,
            minHeight: 0,
            marginLeft: 4,

            '& $shareIcon, & $heartIcon': { fontSize: '0.9rem' }
        }
    },

    shareIcon: {
        fontSize: '1.2rem',
        color: 'whitesmoke'
    },

    heartIcon: {
        fontSize: '1.2rem',
        color: (props: ExperienceStyleProps) => 
            props.isExperienceSaved ? '#FE4164' : 'whitesmoke'
    },

    categories: {
        display: 'flex',
        margin: '10px 0'
    },

    category: {
        height: 35,
        width: 130,
        marginRight: 20,
        fontSize: '0.9rem',
        [theme.breakpoints.down('xs')]: {
            height: 26,
            width: 90,
            fontSize: '0.7rem'
        }
    },

    quickInfos: {
        backgroundColor: '#1C1C1C',
        borderRadius: '1rem',
        display: 'flex',
        padding: 8,
        margin: '1.3rem 0 0.5rem',
        width: 500,
        [theme.breakpoints.down('md')]: { width: 450 },
        [theme.breakpoints.down('sm')]: { margin: '1.5rem auto' },
        [theme.breakpoints.down('xs')]: { maxWidth: '100%' }
    },

    quickInfoColumn: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: props => props.numQuickInfosColumns === 4 ? '25%' : '33%',
        '&:nth-child(3)': { // Allow language column to wrap
            whiteSpace: 'pre-line' 
        }
    },

    quickInfoIconCircle: {
        backgroundColor: '#1C1C1C',
        borderRadius: '50%',
        position: 'absolute',
        top: -23,
        left: 'calc(50% - 13px)',
        height: 26,
        width: 26,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            top: -20,
            left: 'calc(50% - 11px)',
            height: 22,
            width: 22,
        }
    },

    quickInfoIcon: {
        color: '#717171',
        fontSize: '1rem',
        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    quickInfoLabel: {
        fontSize: '0.9rem',
        color: '#717171',
        textTransform: 'uppercase',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    quickInfoContent: {
        fontSize: '1rem',
        color: '#DDD',
        textTransform: 'capitalize',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    sectionLabel: {
        fontSize: '1.15rem',
        margin: '10px 0 0'
    },
    
    host: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 0'
    },

    creatorName: {
        fontSize: '0.9rem',
        color: '#CBCBCB',
        margin: '0 10px'
    },

    bioToggler: {
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
    },

    bodyText: {
        width: '100%',
        fontSize: '0.97rem',
        color: '#C8C8C8',
        lineHeight: 1.4,
        margin: '5px 0'
    },

    itemList: {
        fontSize: '1rem',
        color: '#C8C8C8',
        listStylePosition: 'inside',
        padding: 0,
        marginTop: '0.5rem',
        textTransform: 'capitalize'
    },

    map: {
        maxWidth: 500,
        marginTop: 10,
        '& div > *': { cursor: 'default' },
        '& .mapboxgl-map': {
            borderRadius: '1.7rem',
        }
    },

    mapMarker: {
        backgroundColor: 'rgba(197, 197, 197, 0.4)',
        width: 40, 
        height: 40,
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    mapMarkerDot: {
        backgroundColor: '#FFF',
        width: 15, 
        height: 15,
        borderRadius: '100%'
    },

    reviewDivisor: {
        backgroundColor: 'rgba(197, 197, 197, 0.4)',
        width: '40%',
        padding: '0.5px 0'
    }
});

export const mobileStyles = (theme: Theme) => createStyles({
    carousel: {
        maxWidth: '90%',
        margin: '10px auto 0',

        '& .image-gallery-slide': {
            '& .image-gallery-image': { 
                objectFit: 'cover',
                height: 320
            },
            '&:focus': { outline: 'none' }
        },

        '& .main-image-wrapper > div': {
            position: 'unset !important'
        },

        '& .main-image': {
            width: 'unset !important',
            height: '320px !important',
            position: 'unset !important'
        },

        '& .image-gallery-thumbnail, & .thumbnail-wrapper': {
            transform: 'none',
            border: 'none !important',
            cursor: 'pointer',

            '& .image-gallery-thumbnail-image': { 
                maxHeight: 'calc((70% - 70px) / 3)'
            }
        },

        '& .thumbnail-wrapper > div': { position: 'unset !important' },

        '& .thumbnail': {
            width: '100px !important',
            height: 'unset !important',
            position: 'unset !important',
            maxHeight: 'calc((70% - 70px) / 3)'
        },

        '& .image-gallery-bullets': { 
            bottom: -20,

            '& .image-gallery-bullet': {
                backgroundColor: '#4F4F4F',
                margin: '0 2px',
                padding: 5,
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
                    '&:hover': { backgroundColor: '#FFF' },
                }
            } 
        }
    },

    online: {
        width: 60,
        padding: 3,
        color: '#2D2E2E',
        backgroundColor: 'rgba(256, 256, 256, 0.56)',
        borderRadius: 5,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.55rem',
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightBold
    },

    body: {
        marginTop: 30,
        width: '95%'
    },

    mainInfos: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between' 
    },

    title: {
        margin: 0,
        lineHeight: 1.2,
        fontSize: '1.15rem'
    },

    location: {
        margin: 0,
        fontSize: '0.85rem'
    },

    shareSaveContainer: {
        display: 'flex',
        margin: 0,
        width: 68
    },

    shareSaveButton: {
        color: 'whitesmoke',
        backgroundColor: '#656565',
        width: 30,
        height: 30,
        minHeight: 0,
        marginLeft: 4,

        '&:hover': { backgroundColor: '#656565' },
       
        '& $shareIcon, & $heartIcon': { fontSize: '0.9rem' }
    },

    shareIcon: {
        fontSize: '1.2rem',
        color: 'whitesmoke'
    },

    heartIcon: {
        fontSize: '1.2rem',
        color: (props: ExperienceStyleProps) => 
            props.isExperienceSaved ? '#FE4164' : 'whitesmoke'
    },

    categories: {
        display: 'flex',
        margin: '10px 0'
    },

    category: {
        height: 26,
        width: 90,
        marginRight: 20,
        fontSize: '0.7rem'
    },

    quickInfos: {
        backgroundColor: '#1C1C1C',
        borderRadius: '1rem',
        display: 'flex',
        padding: 8,
        margin: '1.5rem auto',
        maxWidth: '100%'
    },

    quickInfoColumn: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: props => props.numQuickInfosColumns === 4 ? '25%' : '33%',
        '&:nth-child(3)': { // Allow language column to wrap
            whiteSpace: 'pre-line' 
        }
    },

    quickInfoIconCircle: {
        backgroundColor: '#1C1C1C',
        borderRadius: '50%',
        position: 'absolute',
        top: -20,
        left: 'calc(50% - 11px)',
        height: 22,
        width: 22,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    quickInfoIcon: {
        color: '#717171',
        fontSize: '1rem',
        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    quickInfoLabel: {
        fontSize: '0.8rem',
        color: '#717171',
        textTransform: 'uppercase',
        textAlign: 'center'
    },

    quickInfoContent: {
        fontSize: '0.8rem',
        color: '#DDD',
        textTransform: 'capitalize',
        textAlign: 'center'
    },

    sectionLabel: {
        fontSize: '1.15rem',
        margin: '10px 0 0'
    },
    
    host: {
        display: 'flex',
        alignItems: 'center',
        margin: '0.5rem 0'
    },

    creatorName: {
        fontSize: '0.9rem',
        color: '#CBCBCB',
        margin: '0 10px'
    },

    bioToggler: {
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
    },

    bodyText: {
        width: '100%',
        fontSize: '0.97rem',
        color: '#C8C8C8',
        lineHeight: 1.4,
        margin: '5px 0'
    },

    itemList: {
        fontSize: '1rem',
        color: '#C8C8C8',
        listStylePosition: 'inside',
        padding: 0,
        marginTop: '0.5rem',
        textTransform: 'capitalize'
    },

    map: {
        maxWidth: 500,
        marginTop: 10,
        '& div > *': { cursor: 'default' },
        '& .mapboxgl-map': {
            borderRadius: '1.7rem',
        }
    },

    mapMarker: {
        backgroundColor: 'rgba(197, 197, 197, 0.4)',
        width: 40, 
        height: 40,
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    mapMarkerDot: {
        backgroundColor: '#FFF',
        width: 15, 
        height: 15,
        borderRadius: '100%'
    },

    // For experiences that are just in preview, don't show reviews
    reviewDivisor: {}
});