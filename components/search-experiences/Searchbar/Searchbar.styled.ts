import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import BaseAutocomplete from 'components/Autocomplete';
import PlusMinusInput from 'components/PlusMinusInput';
import GradientButton from 'components/GradientButton';

export const Container = styled('main')(({ theme }) => ({
    margin: '100px auto 0',
    width: '80vw',
    
    [theme.breakpoints.down('md')]: { width: '90vw' },  
    [theme.breakpoints.down('sm')]: { margin: '80px auto 0' }
}));

export const CollapsibleRow = styled('div')(({ theme }) => ({
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
        minWidth: '90vw',
        maxWidth: '100vw',
        marginTop: 10
    }
}));

export const Autocomplete = styled(BaseAutocomplete)(({ theme }) => ({
    width: '30%',
    maxWidth: 340,
    minWidth: 280,
    marginRight: '1.5rem',

    [theme.breakpoints.down('md')]: { marginRight: 8 },
    [theme.breakpoints.down('sm')]: {
        minWidth: '90vw',
        maxWidth: '100vw',
        marginTop: 10
    }
}));

export const CapacityInput = styled(PlusMinusInput)(({ theme }) => ({
    width: 180,
    marginRight: '1.5rem',

    [theme.breakpoints.down('md')]: { marginRight: 8 },
    [theme.breakpoints.down('sm')]: { 
        width: 'calc(65% - 10px)',
        marginRight: 10
    }
}));

export const SearchButton = styled(GradientButton)(({ theme }) => ({
    width: 90,

    [theme.breakpoints.down('sm')]: { width: '35%' }
}));

export const TitleSearchbar = styled(InputBase)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightBold,
    color: '#929293',
    padding: '10px 8px',
    height: 45,
    marginTop: 10
}));