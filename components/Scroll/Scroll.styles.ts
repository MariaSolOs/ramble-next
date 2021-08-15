import { createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    root: {
        '&.rcs-custom-scroll .rcs-custom-scrollbar': { opacity: 1 },

        '&.rcs-custom-scroll .rcs-inner-handle': {
            background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
        }
    }
});

export default styles;