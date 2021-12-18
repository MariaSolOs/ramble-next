import { styled } from '@mui/material/styles';

import BaseTip from 'components/Tip';
import { AutocompletePaper } from 'components/Autocomplete';

export * from 'components/experience-builder/slides/Shared.styled';

export const Tip = styled(BaseTip)({ margin: '1rem 0 30px' });

export const Paper = styled(AutocompletePaper)(({ theme }) => ({
    '&.MuiAutocomplete-paper': {
        fontSize: '0.85rem',
        maxHeight: 200,
        
        [theme.breakpoints.down('sm')]: { 
            maxHeight: 120,
    
            '& .MuiAutocomplete-listbox': {
                maxHeight: '100%',
                padding: 0
            },
    
            '& .MuiAutocomplete-option': {
                minHeight: 0,
                padding: '8px 0 6px 10px'
            }
        },
        
        '& .MuiAutocomplete-loading': { color: '#CECECE' }
    }
}));