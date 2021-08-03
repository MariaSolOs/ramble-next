import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { NavbarProfileMenuStyleProps } from './index';

const styles = (theme: Theme) => createStyles({
    button: {
        height: 45,
        padding: '4px 3px 3px',
        backgroundColor: (props: NavbarProfileMenuStyleProps) =>
            props.isCreator ? '#FFF' : 'rgba(65, 65, 65, 0.9)',
        borderRadius: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        border: props => props.isCreator ? 'solid 1px black' : 'none',
        '&:focus-visible': { outline: 'none' },

        [theme.breakpoints.down('xs')]: { height: 40 }
    },

    avatar: {
        [theme.breakpoints.down('xs')]: { 
            height: 35,
            width: 35 
        }
    },

    userName: {
        color: props => props.isCreator ? '#000' : '#E8E8E8',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1rem',
        letterSpacing: '-0.06rem',
        margin: '0 0.5rem',

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    menu: {
        '& .MuiMenu-paper': {
            backgroundColor: props =>
                props.isCreator ? '#FFF' : 'rgba(65, 65, 65, 0.9)',
            borderRadius: '1rem',
            marginTop: '0.4rem',
            padding: '0 4px'
        },

        '& .MuiMenu-list .MuiListItem-root': {
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '4px 20px',
            marginBottom: 3,
            borderRadius: '0.65rem',
            minHeight: 40,

            '&:last-child': { margin: 0 },

            [theme.breakpoints.down('xs')]: { 
                minHeight: 35,
                marginBottom: 0              
            }
        }
    },

    link: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.05rem',
        color: props => props.isCreator ? '#000' : '#E8E8E8',
        textDecoration: 'none'
    },

    menuItem: {
        '&:hover': {
            backgroundColor: props => 
                props.isCreator ? 'rgba(220, 220, 220, 0.96)' : 'rgba(118, 118, 118, 0.96)',
            transition: 'all 0.3s ease-in-out'
        }
    },

    activeItem: {
        backgroundColor: props => 
            props.isCreator ? 'rgba(220, 220, 220, 0.96)' : 'rgba(118, 118, 118, 0.96)',
        transition: 'all 0.3s ease-in-out'
    }
});

export default styles;