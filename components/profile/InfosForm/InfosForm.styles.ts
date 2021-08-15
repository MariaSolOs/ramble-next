import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    form: {
        margin: '30px 0 60px 20px',
        maxWidth: 950,
        
        [theme.breakpoints.down('xs')]: { 
            marginTop: 20,
            margin: '20px auto 70px'
        }
    },

    label: {
        fontWeight: theme.typography.fontWeightBold,
        color: '#FFF',
        marginBottom: 5,

        [theme.breakpoints.down('xs')]: { fontSize: '0.85rem' }
    },

    formControl: {
        marginBottom: '1rem',
        width: '40%',
        marginRight: '60%',
        
        '&:first-child, &:nth-child(2)': { marginRight: '5%' },

        [theme.breakpoints.down('sm')]: { width: '45%' },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '0 0 1rem',
            '&:first-child': {
                width: '48%', 
                marginRight: '4%' 
            },
            '&:nth-child(2)': { 
                width: '48%',
                marginRight: 0
            }
        }
    },

    creatorBio: {
        width: '85%',
        margin: '0 0 1rem',

        '& .MuiInputAdornment-positionEnd': {
            margin: 0,
            position: 'absolute',
            bottom: 20, 
            right: 20,
            fontSize: '0.8rem'
        },

        [theme.breakpoints.down('sm')]: { width: '95%' },
        [theme.breakpoints.down('xs')]: { width: '100%' }
    },

    footer: {
        position: 'fixed',
        bottom: 0, 
        left: 0, 
        right: 0,
        display: 'flex',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#1C1C1C',
        zIndex: 5,

        [theme.breakpoints.down('xs')]: { height: 60 }
    },

    submitButton: {
        height: 40,
        borderRadius: '0.5rem',
        fontSize: '0.9rem',
        padding: '0 10px',
        margin: '0 15px 0 auto',

        [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
    }
});

export default styles;