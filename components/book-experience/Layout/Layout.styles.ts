import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

import type { LayoutStyleProps } from './index';

const styles = (theme: Theme) => createStyles({
    root: {
        width: '80vw',
        margin: '80px auto 0',

        [theme.breakpoints.down('sm')]: { width: '95vw' }
    },

    experienceWindow: {
        height: 450,
        width: 380,
        marginLeft: 45
    },

    experienceContainer: { 
        width: 350,
        '& .image-gallery-image': {
            minHeight: 330
        }     
    },

    header: {
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 30,

        [theme.breakpoints.down('xs')]: { 
            alignItems: 'center',
            marginBottom: 20
        }
    },

    goBackButton: {
        fontSize: '2.6rem',
        marginBottom: -4,
        cursor: 'pointer',

        [theme.breakpoints.down('xs')]: { 
            fontSize: '2.1rem',
            marginBottom: 0
        }
    },

    stepTitle: {
        fontSize: '2rem',
        margin: '0 2.3rem 0 0',
        lineHeight: 1.1,

        [theme.breakpoints.down('xs')]: { fontSize: '1.6rem' }
    },

    stepSubtitle: {
        color: '#CDCDCD',
        margin: '0 1.8rem 0 0',
        fontSize: '1.2rem',

        [theme.breakpoints.down('xs')]: { display: 'none' }
    },

    mainBody: { display: 'flex' },
    
    formPage: {
        width: 470,
        marginLeft: 100,

        [theme.breakpoints.down('sm')]: { margin: '0 auto' },
        [theme.breakpoints.down('xs')]: { width: '100%' }
    },

    formContent: { 
        minHeight: 400,

        [theme.breakpoints.down('xs')]: { minHeight: 0 }
    },

    nextButton: {
        margin: '1rem auto 0 auto',
        display: 'block',
        width: (props: LayoutStyleProps) => props.nextButtonWidth,
        maxWidth: '100%',
        borderRadius: 6,
        height: 32,
        transition: 'all 300ms ease-in-out',
        '&:disabled': { filter: 'brightness(40%)' },

        [theme.breakpoints.down('xs')]: { 
            margin: '1rem auto 40px auto'
        }
    }
});

export default styles;