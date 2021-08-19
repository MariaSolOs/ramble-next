import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    form: {
        backgroundColor: '#404040',
        height: '33%',
        marginTop: '5%',
        borderRadius: 10,
        padding: 8,
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.down('sm')]: {
            height: '70vh',
            maxHeight: 500,
            padding: '1rem',
            borderRadius: '10px 10px 0 0',
        }
    },

    formDrawer: {
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            color: '#FFF',
        }
    },

    infoIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        fontSize: '1.1rem'
    },

    title: {
        margin: 0,
        fontSize: '1.1rem',

        [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
    },

    subtitle: { 
        margin: 0,
        fontSize: '0.85rem',

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    },

    control: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: { marginTop: '1rem' }
    },

    label: {
        fontWeight: theme.typography.fontWeightBold,
        color: '#ACACAC !important',
        fontSize: '0.9rem',
        display: 'inline-block',

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    },

    input: {
        width: 180,

        '&:focus-visible': { outline: 'none' },
        
        '& .MuiInputBase-input': {
            padding: '0 0 4px',
            color: '#ACACAC',
            textAlign: 'center'
        },
        
        '& .MuiInput-underline:after': {
            transform: 'none',
            transition: 'none',
            borderBottom: '1px solid #FFF'
        }
    },

    dateDialog: {
        '& .MuiPickersBasePicker-pickerView': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            color: '#ECEBE5',
        },

        '& .MuiPickersCalendarHeader-dayLabel': { color: '#ECEBE5' },

        '& .MuiDialogActions-root': {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            '& .MuiButton-textPrimary': { color: '#FFF' }
        },

        '& .MuiPickersCalendarHeader-iconButton': {
            backgroundColor: 'transparent',
            color: '#FFF'
        },

        '& .MuiPickersSlideTransition-transitionContainer > *': {
            fontWeight: theme.typography.fontWeightBold
        },

        '& .MuiPickersDay-day:not(.MuiPickersDay-dayDisabled, .MuiPickersDay-daySelected)': { 
            color: '#ECEBE5',
            cursor: 'pointer',
            transition: 'all 300ms ease-in-out',
            '&:hover': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            }
        },

        '& .MuiPickersDay-daySelected': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B'
        },

        '& .MuiPickersClock-squareMask': {
            backgroundColor: '#ECEBE5',
            color: '#2B2B2B',
            borderRadius: '50%'
        },

        '& .MuiPickersToolbar-toolbar': {
            backgroundColor: '#ECEBE5',
            '& h4, .MuiTypography-subtitle1, h3 ': { color: '#2B2B2B ' },
            '& .MuiTypography-subtitle1:not(.MuiPickersToolbarText-toolbarBtnSelected)': {
                opacity: 0.5
            }
        },

        '& .MuiPickersClock-pin, & .MuiPickersClockPointer-pointer, & .MuiPickersClockPointer-noPoint': {
            backgroundColor: '#000'
        },

        '& .MuiPickersClockPointer-thumb': { border: '14px solid #000' }
    },

    experienceSelect: { borderBottom: '1px solid #FFF' },

    experienceMenu: {
        '& .MuiPaper-root': {
            backgroundColor: '#2A2A2A',
            color: '#929293',
            borderRadius: '1rem'
        },

        '& .MuiMenuItem-root': {
            lineHeight: 1.1,
            fontSize: '0.8rem',
            transition: 'color 300ms ease-in-out',
            '&:hover': { color: '#FFF' },

            [theme.breakpoints.down('xs')]: { minHeight: 0 }
        }
    },

    addButton: {
        width: '100%',
        borderRadius: 6,
        margin: 'auto 0 0',
        '&:disabled': { filter: 'brightness(70%)' },

        [theme.breakpoints.down('sm')]: { padding: '10px 0' }
    },

    openFormButton: {
        backgroundColor: '#404040',
        border: 'none',
        color: '#FFF',
        borderRadius: 6,
        marginTop: '1rem',
        padding: '0.6rem 0',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem'
    }
});

export default styles;