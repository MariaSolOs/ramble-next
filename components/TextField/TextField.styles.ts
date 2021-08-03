import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    inputRoot: {
        backgroundColor: '#2A2A2A',
        letterSpacing: '-0.05rem',
        fontWeight: theme.typography.fontWeightBold,
        color: '#FFF',

        '& .MuiOutlinedInput-input': { padding: 15 },

        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D8246E'
        }
    },

    inputFocused: {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CDCDCD !important'
        }
    },

    labelRoot: { opacity: 0 },

    labelFocused: {
        color: '#CDCDCD !important',
        background: 'linear-gradient(to bottom, #151515 0%, #2A2A2A 60%)',
        paddingRight: 5,
        opacity: 1,
        fontWeight: theme.typography.fontWeightBold
    },

    helperTextRoot: {
        '&.MuiFormHelperText-root.Mui-error, &.MuiFormHelperText-contained': {
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.fontWeightBold,
            color: '#D8246E',
            letterSpacing: '-0.02rem',
            marginLeft: 5
        }
    }
});

export default styles;