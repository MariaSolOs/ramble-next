import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

import Drawer from '@mui/material/Drawer';
import MuiFormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import GradientButton from 'components/GradientButton';

// TODO: Try to find a better styling solution
export const experienceMenuStyles: SxProps<Theme> = (theme) => ({
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

        '&.Mui-selected': { backgroundColor: 'transparent' },
    
        [theme.breakpoints.down('sm')]: { minHeight: 0 }
    }
});

// FIXME: These styles aren't applied
export const datePickerPaperStyles: SxProps<Theme> = (theme) => ({
    '& .MuiCalendarPicker-root': {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        color: '#ECEBE5',
    },

    // '& .MuiPickersCalendarHeader-dayLabel': { color: '#ECEBE5' },

    '& .MuiDialogActions-root': {
        backgroundColor: 'rgba(30, 30, 30, 0.95)',
        
        '& .MuiButton-textPrimary': { color: '#FFF' }
    },

    // '& .MuiPickersCalendarHeader-iconButton': {
    //     backgroundColor: 'transparent',
    //     color: '#FFF'
    // },

    // '& .MuiPickersSlideTransition-transitionContainer > *': {
    //     fontWeight: theme.typography.fontWeightBold
    // },

    // '& .MuiPickersDay-day:not(.MuiPickersDay-dayDisabled, .MuiPickersDay-daySelected)': { 
    //     color: '#ECEBE5',
    //     cursor: 'pointer',
    //     transition: 'all 300ms ease-in-out',
    //     '&:hover': {
    //         backgroundColor: '#ECEBE5',
    //         color: '#2B2B2B'
    //     }
    // },

    // '& .MuiPickersDay-daySelected': {
    //     backgroundColor: '#ECEBE5',
    //     color: '#2B2B2B'
    // },

    // '& .MuiPickersClock-squareMask': {
    //     backgroundColor: '#ECEBE5',
    //     color: '#2B2B2B',
    //     borderRadius: '50%'
    // },

    // '& .MuiPickersToolbar-toolbar': {
    //     backgroundColor: '#ECEBE5',
    //     '& h4, .MuiTypography-subtitle1, h3 ': { color: '#2B2B2B ' },
    //     '& .MuiTypography-subtitle1:not(.MuiPickersToolbarText-toolbarBtnSelected)': {
    //         opacity: 0.5
    //     }
    // },

    // '& .MuiPickersClock-pin, & .MuiPickersClockPointer-pointer, & .MuiPickersClockPointer-noPoint': {
    //     backgroundColor: '#000'
    // },

    // '& .MuiPickersClockPointer-thumb': { border: '14px solid #000' }
});

export const Form = styled('form')(({ theme }) => ({
    backgroundColor: '#404040',
    height: '33%',
    marginTop: '5%',
    borderRadius: 10,
    padding: 8,
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    
    [theme.breakpoints.down('md')]: {
        height: '70vh',
        maxHeight: 500,
        padding: '1rem',
        borderRadius: '10px 10px 0 0',
    }
}));

export const FormDrawer = styled(Drawer)({
    '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        color: '#FFF',
    }
});

export const InfoIcon = styled(InfoRoundedIcon)({
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: '1.1rem'
});

export const FormControl = styled(MuiFormControl)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    
    [theme.breakpoints.down('md')]: { marginTop: '1rem' }
}));

export const Label = styled(FormLabel)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: '#ACACAC !important',
    fontSize: '0.9rem',
    display: 'inline-block',
    
    [theme.breakpoints.down('md')]: { fontSize: '1rem' }
}));

export const Input = styled(Box)({
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
});

export const AddButton = styled(GradientButton)(({ theme }) => ({
    width: '100%',
    borderRadius: 6,
    margin: 'auto 0 0',

    '&:disabled': { filter: 'brightness(70%)' },
    
    [theme.breakpoints.down('md')]: { padding: '10px 0' }
}));

export const OpenFormButton = styled('button')(({ theme }) => ({
    backgroundColor: '#404040',
    border: 'none',
    color: '#FFF',
    borderRadius: 6,
    marginTop: '1rem',
    padding: '0.6rem 0',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '0.9rem',
    letterSpacing: '-0.04rem'
}));