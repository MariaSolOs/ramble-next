import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    gallerySlide: {
        width: '85%',
        margin: '0 auto 10%'
    },

    title: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '2.6rem',
        letterSpacing: '-0.09rem',
        color: '#FFF',
        marginBottom: '0.4rem',

        [theme.breakpoints.down('md')]: { fontSize: '2.4rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '2rem' }
    },

    subtitle: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '1.2rem',
        letterSpacing: '-0.07rem',
        color: '#E5E4E5',
        margin: '0 0 2rem'
    },

    // adventureText: { textAlign: 'right' },

    imagesContainer: {
        display: 'flex',
        marginTop: '2rem',
        justifyContent: 'space-between',
        maxWidth: 840,
        margin: '0 auto',

        [theme.breakpoints.down('sm')]: { justifyContent: 'center' }
    },

    image: {
        width: 250,
        height: 350,
        borderRadius: '1.3rem',

        [theme.breakpoints.down('sm')]: {
            '&:nth-child(odd)': { display: 'none' }
        }
    }
});

export default styles;