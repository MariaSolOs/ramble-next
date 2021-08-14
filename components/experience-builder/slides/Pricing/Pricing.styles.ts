import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    greyText: {
        fontSize: '0.9rem',
        margin: '0 0 10px',
        color: '#CDCDCD',
        display: 'block',
        whiteSpace: 'nowrap',

        [theme.breakpoints.down('xs')]: { fontSize: '0.8rem' }
    },

    textfield: {
        width: 140, 
        [theme.breakpoints.down('xs')]: { width: '90%' },
        '& .MuiInputBase-input': { 
            textAlign: 'center',
            padding: '10px 0'
        },
        '& .MuiInputBase-root': { 
            fontSize: '1.3rem'
        },
        '& .Mui-disabled': { color: '#FFF' }
    },

    priceRow: {
        display: 'flex',
        marginBottom: 30,
        [theme.breakpoints.down('xs')]: { flexWrap: 'wrap' }
    },

    fieldContainer: {
        marginRight: 25,
        [theme.breakpoints.down('sm')]: { marginRight: 10 },

        [theme.breakpoints.down('xs')]: {
            width: '50%',
            margin: '0 0 25px'
        }
    },

    multiplication: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        '& $greyText': { 
            fontSize: '1.1rem',
            [theme.breakpoints.down('sm')]: { fontSize: '0.85rem' }
        }
    },

    selectMenu: {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontSize: '0.85rem',
        maxHeight: 150,
        overflowY: 'scroll',
        letterSpacing: '-0.05rem',
        marginTop: 5,
        '& .MuiMenuItem-root': {
            fontWeight: theme.typography.fontWeightBold, 
            justifyContent: 'center',
            padding: '4px 0',
            [theme.breakpoints.down('xs')]: {
                minHeight: 0,
                height: 35
            }
        }
    },

    privatePriceHeader: {
        position: 'relative',

        '& $greyText': { 
            whiteSpace: 'break-spaces',
            [theme.breakpoints.down('xs')]: { marginTop: 10 }
        }
    },

    switch: {
        position: 'absolute',
        top: 5, 
        right: 70,
        '& .MuiSwitch-track': { backgroundColor: '#929293' },

        [theme.breakpoints.down('sm')]: { right: 10 },
        [theme.breakpoints.down('xs')]: { top: 0 }
    },

    privatePriceContainer: {
        [theme.breakpoints.down('xs')]: { marginBottom: 80 }
    }
});

export default styles;