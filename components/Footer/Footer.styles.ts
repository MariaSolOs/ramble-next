import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    footer: {
        width: 'calc(300px * 3 - 12rem)',
        maxWidth: '100vw',
        margin: '0 auto 2rem 12rem',

        [theme.breakpoints.down('sm')]: { margin: '0 auto 2rem 1rem' },
        [theme.breakpoints.down('xs')]: { 
            width: '98vw',
            margin: '0 auto 2rem 2vw'
        }
    },

    title: {
        fontFamily: 'Futura, Nunito Sans',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: '2rem',
        letterSpacing: '-0.07rem',
        color: '#F6F6F6',
        margin: '0 auto 1.5rem 0',

        [theme.breakpoints.down('xs')]: {
            fontSize: '1.8rem'
        }
    },

    body: {
        display: 'flex',
        margin: '0 auto 0 0'
    },

    bodyColumn: {
        width: '33%',
        
        [theme.breakpoints.down('sm')]: {
            width: '30%'
        }
    },

    columnTitle: {
        fontSize: '1rem',
        letterSpacing: '-0.07rem',
        color: '#ECEBE5',
        margin: '0 0 0.7rem',

        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem'
        }
    },

    mediaIcon: {
        color: '#C0BFBA',
        fontSize: '1.8rem',
        marginRight: 10,
        transition: 'all 300ms ease-in-out'
    },

    facebookIcon: {
        '&:hover': { color: '#3B579D' }
    },

    instagramIcon: {
        borderRadius: 10,
        '&:hover': {
            color: '#FFF',
            backgroundImage: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
        }
    },

    languageChip: {
        backgroundColor: 'rgba(65, 65, 65, 0.9) !important',
        color: '#FFF',
        letterSpacing: '-0.05rem',
        width: 'fit-content',
        padding: '3px 10px',
        marginRight: 10,
        cursor: 'pointer',
        
        [theme.breakpoints.down('xs')]: {
            padding: '3px 5px',
        }
    },

    greyText: {
        color: '#C0BFBA',
        fontSize: '0.85rem',
        letterSpacing: '-0.05rem',
        fontWeight: theme.typography.fontWeightRegular,

        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem'
        }
    },

    supportLink: {
        cursor: 'pointer',
        transition: 'color 300ms',

        '&:hover': { color: '#FFF' }
    }
});

export default styles;