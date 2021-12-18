import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

import Box from '@mui/material/Box';
import MuiSwitch from '@mui/material/Switch';
import BaseTextField from 'components/TextField';

export * from 'components/experience-builder/slides/Shared.styled';

// TODO: Try to find a better styling solution
export const selectStyles: SxProps<Theme> = (theme) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#2A2A2A',
        color: '#929293',
        borderRadius: '1rem',
        fontSize: '0.85rem',
        maxHeight: 150,
        letterSpacing: '-0.05rem',
        marginTop: 5 / 8,

        '& .MuiMenuItem-root': {
            fontWeight: theme.typography.fontWeightBold, 
            justifyContent: 'center',
            padding: '4px 0',
            backgroundColor: 'transparent',

            [theme.breakpoints.down('sm')]: {
                minHeight: 0,
                height: 35
            }
        }
    }
});

export const PriceRow = styled('div')(({ theme }) => ({
    display: 'flex',
    marginBottom: 30,

    [theme.breakpoints.down('sm')]: { flexWrap: 'wrap' }
}));

export const GreyText = styled(Box)(({ theme }) => ({
    fontSize: '0.9rem',
    margin: '0 0 10px',
    color: '#CDCDCD',
    display: 'block',
    whiteSpace: 'nowrap',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
}));

export const TextField = styled(BaseTextField)(({ theme }) => ({
    width: 140, 

    [theme.breakpoints.down('sm')]: { width: '90%' },

    '& .MuiOutlinedInput-input.MuiInputBase-input': { 
        textAlign: 'center',
        padding: '8px 0'
    },
    '& .MuiInputBase-root': { fontSize: '1.3rem' },
    '& .Mui-disabled': { 
        color: '#FFF',
        WebkitTextFillColor: '#FFF'
    }
}));

export const FieldContainer = styled('div')(({ theme }) => ({
    marginRight: 25,

    [theme.breakpoints.down('md')]: { marginRight: 10 },
    [theme.breakpoints.down('sm')]: {
        width: '50%',
        margin: '0 0 25px'
    }
}));

export const Multiplication = styled(FieldContainer)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',

    [`& ${GreyText}`]: { 
        fontSize: '1.1rem',

        [theme.breakpoints.down('md')]: { fontSize: '0.85rem' }
    }
}));

export const PrivatePriceHeader = styled('div')(({ theme }) => ({
    position: 'relative',
    
    [`& ${GreyText}`]: { 
        whiteSpace: 'break-spaces',

        [theme.breakpoints.down('sm')]: { marginTop: 10 }
    }
}));

export const Switch = styled(MuiSwitch)(({ theme }) => ({
    position: 'absolute',
    top: 5, 
    right: 70,
    '& .MuiSwitch-track': { backgroundColor: '#929293' },
    
    [theme.breakpoints.down('md')]: { right: 10 },
    [theme.breakpoints.down('sm')]: { top: 0 }
}));
