import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    dialog: {
        '& .MuiDialog-paper': {
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            color: '#FFF',
            borderRadius: '1rem',
            padding: '1.3rem 1.1rem 1.1rem'
        }
    },

    form: {
        display: 'flex',
        flexDirection: 'column'
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        margin: 0,
        fontSize: '1.25rem',
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('xs')]: { fontSize: '0.9rem' }
    },

    closeIcon: {
        color: '#656565',
        cursor: 'pointer',

        [theme.breakpoints.down('xs')]: { fontSize: '1rem' }
    },

    ratingContainer: {
        margin: '2rem auto'
    },

    rating: {
        color: '#FFF',

        '& .MuiRating-iconEmpty': { stroke: '#FFF' }
    },

    reviewLabel: {
        textIndent: 5,
        marginBottom: 10,

        [theme.breakpoints.down('xs')]: {
            textIndent: 0,
            fontSize: '0.8rem'
        }
    },

    reviewTextfield: {
        '& .MuiOutlinedInput-input': { 
            fontSize: '0.9rem',
            padding: 0,

            [theme.breakpoints.down('xs')]: {
                fontSize: '0.8rem',
                width: '98%'
            }
        },

        '& .MuiInputAdornment-positionEnd': {
            position: 'absolute',
            right: 15,
            bottom: 20, 
            fontSize: '0.8rem'
        }
    },

    doneButton: {
        margin: '10px 0 0 auto',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        color: '#FFF',
        backgroundColor: 'transparent',
        border: 'none',
        letterSpacing: '-0.05rem',
        fontSize: '0.9rem'
    }
});

export default styles;