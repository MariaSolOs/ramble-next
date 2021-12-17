import { styled } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import BaseAutocomplete, { AutocompletePaper } from 'components/Autocomplete';
import BaseTip from 'components/Tip';
import { Subtitle as BaseSubtitle } from 'components/experience-builder/slides/Shared.styled';

export { Title } from 'components/experience-builder/slides/Shared.styled';

export const Subtitle = styled(BaseSubtitle)({ margin: '8px 0' });

export const Autocomplete = styled(BaseAutocomplete)({
    marginTop: '1rem',

    '& .MuiOutlinedInput-root.MuiInputBase-root': { borderRadius: 4 }
});

export const Paper = styled(AutocompletePaper)(({ theme }) => ({
    '&.MuiAutocomplete-paper': {
        fontSize: '0.85rem',
        maxHeight: 200,
        overflowY: 'scroll',
        
        [theme.breakpoints.down('sm')]: { 
            maxHeight: 150,

            '& .MuiAutocomplete-listbox': {
                maxHeight: '100%',
                padding: 0
            },
            
            '& .MuiAutocomplete-option': {
                minHeight: 0,
                padding: '8px 0 6px 10px'
            }
        }
    },
}));

export const Tip = styled(BaseTip)({ margin: '0 0 10px' });

export const ZoomTextField = styled(InputBase)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: '1rem',
    color: '#FFF',
    backgroundColor: '#2A2A2A',
    width: '100%',
    padding: '10px 15px',
    height: 45,
    borderRadius: '1rem',
    marginBottom: 15,
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' },
    
    '& .MuiSvgIcon-root': { fill: '#929293' }
}));
