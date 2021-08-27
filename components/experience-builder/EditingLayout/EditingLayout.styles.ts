import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

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

    pageContainer: { 
        display: 'flex',
        height: 'calc(100% - 55px)'
    },

    pageContent: {
        marginLeft: 80,
        overflowY: 'scroll',
        maxHeight: 'calc(100% - 10px)',
        
        [theme.breakpoints.down('sm')]: { marginLeft: 50 },
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto 60px',
            width: '95vw'
        }
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

    disabledLink: {
        cursor: 'default',
        opacity: 0.55
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
    
    footer: {
        backgroundColor: '#1C1C1C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 49,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
        padding: '0 10px'
    },

    navbarToggler: {
        marginRight: 10,
        borderRadius: 4,
        backgroundColor: '#757575',
        color: '#FFF',
        cursor: 'pointer',
        padding: '3px 3px 0',
        boxSizing: 'border-box'
    },

    footerButton: {
        borderRadius: 8,
        height: 35,
        minWidth: 90,
        fontSize: 14,
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: '-0.05rem',
        color: '#FFF',
        border: 'none',
        '&:disabled': { filter: 'brightness(40%)' },

        [theme.breakpoints.down('xs')]: { 
            height: 35,
            minWidth: 75,
            fontSize: 12
        }
    },

    nextButton: { marginLeft: 10 },

    backButton: {
        background: 'radial-gradient(circle at 96%, #2E2E2E, #6F6F6F)',
    },

    saveButton: {
        marginRight: 'auto',
        padding: '0 1rem',
        backgroundColor: '#6B6B6B'
    }
});

export default styles;