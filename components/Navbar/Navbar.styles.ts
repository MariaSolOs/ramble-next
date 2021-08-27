import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        position: 'absolute',
        right: 0
    },

    collapsedNav: {
        [theme.breakpoints.up('md')]: { display: 'none' }
    },

    toggleIcon: {
        color: '#F6F6F6',
        height: '3rem',
        margin: '0 10px',

        [theme.breakpoints.down('xs')]: { height: '2rem' }
    },

    menu: {
        '& .MuiMenu-paper': {
            backgroundColor: 'rgba(65, 65, 65, 0.7)',
            borderRadius: '1rem',
            padding: '0 4px',

            '&.MuiPopover-paper': { 
                minWidth: 200,
                [theme.breakpoints.down('xs')]: { minWidth: 150 }
            },
        },

        '& .MuiMenu-list .MuiListItem-root': {
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: '0.65rem',
            padding: 4,
            marginBottom: 4,

            '&:last-child': { margin: 0 },

            [theme.breakpoints.down('xs')]: {
                height: 30,
                minHeight: 0,
                overflow: 'visible'
            }
        },

        '& li.MuiListItem-button:not($profileButton), button.MuiListItem-button': {
            '&:hover': {
                backgroundColor: 'rgba(118, 118, 118, 0.96)',
                transition: 'all 0.3s ease-in-out'
            }
        }
    },

    profileButton: {
        height: 45,

        [theme.breakpoints.down('xs')]: { height: 40 }
    },

    expandedLinks: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 10,

        [theme.breakpoints.down('sm')]: { display: 'none' }
    },

    dialogToggler: {
        background: 'none',
        border: 'none'
    },

    menuItem: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.07rem',
        color: '#E8E8E8',
        textDecoration: 'none'
    },

    expandedLink: {
        padding: 8,
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1.05rem',
        letterSpacing: '-0.07rem',
        whiteSpace: 'nowrap',
        marginRight: 10,
        color: '#ACACAC',
        textDecoration: 'none'
    },

    whiteNavLink: { color: '#FFF' },

    languageChip: {
        backgroundColor: 'rgba(65, 65, 65, 0.9) !important',
        color: '#FFF',
        letterSpacing: '-0.05rem',
        width: 'fit-content',
        marginRight: 10
    },

    languageItem: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: -20
    },

    languageIcon: {
        marginRight: 3,
        color: '#616161',
        fontSize: '1.4rem'
    }
});

export default styles;