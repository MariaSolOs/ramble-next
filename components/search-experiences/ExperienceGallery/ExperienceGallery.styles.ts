import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '80vw',
        margin: '0 auto 30px',

        [theme.breakpoints.down('sm')]: { 
            width: 'calc(265px * 2)',
            margin: '0 auto'
        },
        [theme.breakpoints.down('xs')]: { width: 265 }
    },

    card: {
        width: 240,
        height: 290,
        margin: '25px 25px 0 0',

        [theme.breakpoints.down('xs')]: { 
            width: 255,
            height: 300,
            margin: '25px auto 0' 
        }
    },

    cardFadeOut: { opacity: 0 }, 

    cardFadeIn: { 
        opacity: 1,
        transition: 'all 300ms ease-in'
    }
});

export default styles;