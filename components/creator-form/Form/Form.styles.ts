import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100vw',
        backgroundColor: '#000',
        paddingTop: 100
    },

    formContent: { 
        width: '80vw',
        margin: '0 auto',

        [theme.breakpoints.down('sm')]: { width: '90vw' },
        [theme.breakpoints.down('xs')]: { 
            width: '100vw',
            padding: '0 30px 0 32px',
            boxSizing: 'border-box'
        }
    },

    header: {
        display: 'flex',
        margin: '0 0 50px -26px',

        '& $subtitle': { 
            fontSize: '1.25rem',
            [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' }
        }
    },

    headerGradient: {
        backgroundColor: '#F6D327',
        backgroundImage: 'linear-gradient(315deg, #f6d327 0%, #de4daa 74%)',
        padding: 5,
        marginRight: 16,
        borderRadius: '1.5rem'
    },

    title: { 
        color: '#FFF',
        fontSize: '1.9rem',
        margin: 0,

        [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' }
    },

    subtitle: {
        color: '#ECEBE5',
        fontSize: '1.1rem',
        margin: 0,

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    },

    photoDropzone: {
        borderRadius: '100%',
        margin: '20px 0 0 20px',
        height: 200,
        width: 200,
        backgroundColor: '#222',
        position: 'relative',
        [theme.breakpoints.down('xs')]: { margin: '20px auto' }
    },

    photoPreviewContainer: {
        position: 'relative',
        width: 'fit-content'
    },

    photoPreview: {
        objectFit: 'cover',
        borderRadius: '100%',
        margin: 0,
        height: 200,
        width: 200
    },

    addIcon: {
        fontSize: 46,
        color: '#808080',
        position: 'absolute',
        top: 'calc(100px - 23px)',
        left: 'calc(100px - 23px)',
        transition: 'all 300ms ease-in-out',
        cursor: 'pointer',
        '&:hover': { 
            color: '#CDCDCD',
            transform: 'scale(1.04)',
        }
    },

    deleteIcon: {
        position: 'absolute',
        top: 0, 
        right: 5,
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: '#808080',
        transition: 'all 200ms ease-in-out',
        '&:hover': { color: '#FFF' }
    },

    fieldContainer: {
        margin: '50px 0',
        width: '60vw',

        [theme.breakpoints.down('md')]: { width: 700 },
        [theme.breakpoints.down('sm')]: { width: '100%' }
    },

    aboutYouTextField: {
        width: '90%',
        [theme.breakpoints.down('xs')]: { width: '100%' },
        '& .MuiOutlinedInput-multiline': {
            padding: '1rem',
            borderRadius: 10
        },
        '& .MuiOutlinedInput-input': { padding: 0 },
        '& .MuiInputAdornment-positionEnd': {
            margin: 0,
            position: 'absolute',
            bottom: 15, 
            right: 15,
            fontSize: '0.8rem'
        }
    },

    phoneTextField: {
        marginTop: 20,
        width: 250,
        [theme.breakpoints.down('xs')]: { width: '100%' },
        '& .MuiOutlinedInput-root': { borderRadius: 10 }
    },

    idsContainer: {
        display: 'flex',
        margin: '2rem 0',
        width: 500,
        justifyContent: 'space-between',

        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            margin: '1rem 0 0'
        }
    },

    idDropzoneContainer: {
        width: 220,
        height: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        [theme.breakpoints.down('sm')]: { marginBottom: 30 },

        '& $addIcon': { position: 'unset' },

        '& $deleteIcon': {
            position: 'absolute',
            top: 0,
            right: 0
        }
    },

    idDropzone: {
        borderRadius: '1rem',
        backgroundColor: '#222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '75%',
        width: '100%'
    },

    idDropzoneTitle: {
        color: '#CDCDCD',
        fontSize: '0.85rem',
        textAlign: 'center',
        margin: '0 auto',
        height: '10%'
    },

    idDropzoneSubtitle: {
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center',
        margin: '0 auto',
        color: '#CDCDCD',
        fontSize: '0.75rem',
        height: '10%',
        marginBottom: '5%'
    },

    idDropzoneText: { color: '#808080' },

    idPreview: {
        borderRadius: '1rem',
        height: '85%',
        maxWidth: '90%'
    },

    footer: {
        width: '100vw',
        backgroundColor: '#1C1C1C',
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    doneButton: {
        minWidth: 100,
        marginRight: 20,
        height: 35,

        '&:disabled': { filter: 'brightness(70%)' }
    },

    tip: {
        [theme.breakpoints.down('sm')]: { 
            fontSize: '0.85rem',
            margin: '5px 0'
        }
    }
});

export default styles;