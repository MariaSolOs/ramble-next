import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    container: {
        textAlign: 'left',
        width: '100vw',
        height: '100%',
        backgroundColor: '#000',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    title: {
        fontSize: '2.7rem',
        color: '#E6E6E6',
        animation: '$color-bouncy 1.3s ease-in-out',
        margin: '0 auto 35px',
        width: '70%',

        [theme.breakpoints.down('sm')]: { fontSize: '2.1rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '1.7rem' }
    },

    '@keyframes color-bouncy': {
        '0%': {  
            transform: 'translate(0)',
            textShadow: 
                '0 0 0 #0C2FFB,' + 
                '0 0 0 #2CFCFD,' +
                '0 0 0 #FB203B,' +
                '0 0 0 #FEFC4B'
        },
        '30%': {  
            transform: 'translate(-8px, -8px)',
            textShadow: 
                '0 0.125em 0 #0C2FFB,' + 
                '0 0.25em 0 #2CFCFD,' +
                '0 -0.125em 0 #FB203B,' +
                '0 -0.25em 0 #FEFC4B'
        },
        '60%': {  
            transform: 'translate(8px, 8px)',
            textShadow: 
                '0 -0.0625em 0 #0C2FFB,' +
                '0 -0.125em 0 #2CFCFD,' +
                '0 0.0625em 0 #FB203B,' +
                '0 0.125em 0 #FEFC4B'
        },
        '90%': {  
            transform: 'translate(0)',
            textShadow: 
                '0 0 0 #0C2FFB,' +
                '0 0 0 #2CFCFD,' +
                '0 0 0 #FB203B,' +
                '0 0 0 #FEFC4B'
            }
    },
        
    fadeExit: { opacity: 1 },

    fadeExitActive: {
        opacity: 0,
        transition: 'all 1s ease-out'
    }
});

export default styles;