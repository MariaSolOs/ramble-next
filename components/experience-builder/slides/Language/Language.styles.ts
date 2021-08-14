import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    tip: { margin: '1rem 0 30px' },

    autocompletePaper: {
        fontSize: '0.85rem',
        maxHeight: 200,
        overflowY: 'scroll',

        [theme.breakpoints.down('xs')]: { 
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
});

export default styles;