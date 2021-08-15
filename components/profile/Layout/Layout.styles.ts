import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '80vw',
        margin: '90px auto 30px',

        [theme.breakpoints.down('xs')]: {
            width: '95vw',
            margin: '75px auto 0'
        }
    },

    header: { 
        display: 'flex',
        alignItems: 'center'
    },

    photo: {
        width: 130,
        height: 130,
        marginRight: 30,

        '&.MuiAvatar-colorDefault': {
            backgroundColor: '#FFF',
            fontSize: '2.5rem',
            color: '#000'
        },

        [theme.breakpoints.down('xs')]: {
            width: 95,
            height: 95,
            marginRight: 20
        }
    },

    name: {
        color: '#E6E6E6',
        margin: 0,
        fontSize: '1.8rem'
    },

    city: {
        color: '#ACACAC',
        margin: 0,
        fontSize: '1.2rem',
        fontWeight: theme.typography.fontWeightRegular
    },

    nav: { 
        marginTop: 30,
        [theme.breakpoints.down('xs')]: { marginRight: 20 }
    },

    navLink: {
        textDecoration: 'none',
        color: '#ACACAC',
        fontSize: '1.2rem',
        whiteSpace: 'nowrap',

        '&:first-child': {
            marginRight: 50,
            [theme.breakpoints.down('xs')]: { marginRight: 30 }
        },

        '&:hover': {
            color: '#FFF',
            transition: 'all 200ms ease-in-out'
        },

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    activeLink: {
        color: '#FFF',
        transition: 'all 200ms ease-in-out'
    },

    photoDropzone: {
        backgroundColor: '#FFF',
        borderRadius: '50%',
        position: 'relative'
    },

    photoPreview: {
        borderRadius: '50%',
        objectFit: 'cover',
    },

    addPhotoIcon: {
        color: '#000',
        position: 'absolute',
        top: 'calc(50% - 1.5rem)',
        left: 'calc(50% - 1.5rem)',
        fontSize: '3rem',
        cursor: 'pointer'
    },

    deletePhotoIcon: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        right: -10,

        [theme.breakpoints.down('xs')]: { fontSize: '1.2rem' }
    }
});

export default styles;