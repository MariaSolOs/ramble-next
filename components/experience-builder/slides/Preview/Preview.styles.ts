import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dropzoneContainer: {
        display: 'flex',
        marginTop: '2rem',

        [theme.breakpoints.down('xs')]: { 
            flexWrap: 'wrap',
            width: 300,
            margin: '2rem auto'
        }
    },

    dropzoneItem: {
        display: 'flex',
        flexDirection: 'column',
        width: 140,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,

        [theme.breakpoints.down('md')]: { marginRight: 15 },
        [theme.breakpoints.down('sm')]: { 
            marginRight: 10,
            width: 130 
        },
        [theme.breakpoints.down('xs')]: { 
            margin: '0 auto 40px',
            width: 140
        }
    },

    picText: {
        color: '#CDCDCD',
        fontSize: '0.85rem',
        textAlign: 'center',
        width: '90%'
    },

    picTitle: {
        margin: 0,
        fontWeight: theme.typography.fontWeightBold,
        height: '6%'
    },

    picDescription: {
        margin: '0 0 10px',
        fontWeight: theme.typography.fontWeightRegular,
        height: '20%',
        fontSize: '0.8rem'
    },

    dropzone: {
        borderRadius: '1rem',
        backgroundColor: '#2F2E2E',
        width: '100%',
        height: 'calc(74% - 10px)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    previewImg: {
        maxWidth: '95%',
        height: 'auto',
        maxHeight: '70%',
        objectFit: 'contain'
    },

    addIcon: {
        fontSize: '3rem',
        color: '#808080',
        cursor: 'pointer',
        '&:hover': { 
            color: '#CDCDCD',
            transform: 'scale(1.05)',
            transition: 'transform 300ms ease-in-out'
        }
    },

    deleteIcon: {
        position: 'absolute',
        top: 5, 
        right: 5,
        cursor: 'pointer',
        transition: 'color 300ms ease-in-out',
        color: '#000',
        width: 20,
        height: 20,
        '&:hover': { color: '#FFF' }
    }
});

export default styles;