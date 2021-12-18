import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { CreateLayoutStyleProps } from './index';

const styles = (theme: Theme) => createStyles({
    root: {
        paddingTop: 100,
        width: '100vw',
        height: '100%',
        backgroundColor: '#000',

        [theme.breakpoints.down('xs')]: { 
            paddingTop: 80,
            overflowY: 'scroll',
            height: 'auto',
            minHeight: '100%'
        }
    },

    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        width: '100%',
        zIndex: 1
    },
    
    footerButtons: {
        backgroundColor: '#1C1C1C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 'calc(100% - 6px)'
    },

    footerButton: {
        borderRadius: 8,
        height: 35,
        minWidth: 90,
        fontSize: 14,

        [theme.breakpoints.down('xs')]: { 
            height: 35,
            minWidth: 75,
            fontSize: 12
        }
    },

    nextButton: { 
        margin: '0 10px',
        '&:disabled': { filter: 'brightness(40%)' }
    },

    backButton: {
        background: 'radial-gradient(circle at 96%, #2E2E2E, #6F6F6F)',
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.05rem',
        color: '#FFF',
        border: 'none'
    },

    progress: {
        height: 6,
        '& .MuiLinearProgress-barColorPrimary': {
            background: (props: CreateLayoutStyleProps) =>
             `linear-gradient(to right, #2BB282 ${100 - props.progressValue}%, #2D73EA 100%)`,
            borderRadius: '1rem'
        },
        '&.MuiLinearProgress-colorPrimary': {
            backgroundColor: 'transparent'
        }
    },

    pageContainer: { 
        display: 'flex',
        height: 'calc(100% - 55px)'
    },

    navbar: {
        listStyle: 'none',
        padding: 0,
        width: 'fit-content',
        margin: '0 20px'
    },

    navLink: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.1rem',
        margin: '0 0 8px',
        textIndent: 30,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        
        [theme.breakpoints.down('xs')]: { 
            fontSize: '1rem',
            margin: '0 0 10px' 
        }
    },

    inactiveNavLink: {
        opacity: 0.55,
        cursor: 'default'
    },

    checkIconContainer: {
        background: 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        marginRight: 10,
        borderRadius: '50%'
    },

    checkIcon: {
        color: '#FFF',
        fontSize: 18
    },

    navbarToggler: {
        margin: '0 auto 0 10px',
        borderRadius: 4,
        backgroundColor: '#757575',
        color: '#FFF',
        cursor: 'pointer',
        padding: '3px 3px 0',
        boxSizing: 'border-box'
    },

    navbarDrawer: {
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            color: '#FFF',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        },
        
        '& .MuiBackdrop-root': { backdropFilter: 'blur(5px)' }
    },

    pageContent: {
        marginLeft: 80,
        maxHeight: 'calc(100% - 10px)',
        
        [theme.breakpoints.down('sm')]: { marginLeft: 50 },
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto 60px',
            width: '95vw'
        }
    }
});

export default styles;