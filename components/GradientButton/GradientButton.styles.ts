import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { GradientButtonProps } from './index';

const styles = (theme: Theme) => createStyles({
    root: {
        padding: '0.45rem 0.75rem',
        borderRadius: '2rem',
        border: 'none',
        background: (props: GradientButtonProps) => {
            switch (props.variant) {
                case 'experience': 
                    return 'linear-gradient(to right, #2BB282 0%, #2D73EA 100%)';
                case 'creator':
                    return 'radial-gradient(circle at 298%, #F7521E, #AC9EFF)';
                case 'error':
                    return 'linear-gradient(to right, #1FA2FF 0%, #12D8FA 100%)';
                default: return '';
            }
        },
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.9rem',
        letterSpacing: '-0.04rem',
        color: '#ECEBE5',

        '&:disabled': { 
            pointerEvents: 'none',
            filter: 'brightness(70%)'
        }
    },

    link: { 
        textDecoration: 'none',
        display: 'contents' 
    }
});

export default styles;