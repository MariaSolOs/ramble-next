import { createStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    subtitle: {
        fontSize: '1.3rem',
        color: '#CDCDCD',
        margin: 0,

        [theme.breakpoints.down('sm')]: { fontSize: '1.1rem' },
        [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
    },

    pageContainer: {
        display: 'flex',
        width: 830,
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 20,
            width: '95%'
        },
        [theme.breakpoints.down('sm')]: { width: '100%' }
    },

    instructions: {
        width: 400,
        marginRight: 30,

        [theme.breakpoints.down('md')]: { 
            width: '100%',
            margin: '0 0 30px'
        }
    },

    tip: { fontSize: '0.95rem' },

    calendar: {
        '& .fc.fc-media-screen': {
            width: 420,
            [theme.breakpoints.down('xs')]: { 
                width: '100%',
                minWidth: 280 
            }
        },

        '& .fc .fc-daygrid-day-frame': {
            height: 68,
            cursor: 'pointer'
        },

        '& .fc .fc-day-disabled .fc-daygrid-day-frame': {
            cursor: 'not-allowed'
        },

        '& .fc .fc-day-disabled': {
            backgroundColor: 'transparent'
        },

        '& .fc .fc-timegrid-slot': {
            height: 30
        },

        '& .fc .fc-timegrid-slot-lane': { 
            cursor: 'pointer' 
        },

        '& .fc .fc-toolbar-title': {
            fontSize: '1.15rem',
            [theme.breakpoints.down('xs')]: { fontSize: '0.95rem' }
        },

        '& .fc .fc-daygrid-day.fc-day-today': {
            backgroundColor: 'transparent'
        },

        '& .fc .fc-button': {
            fontWeight: theme.typography.fontWeightBold,
            fontSize: '0.9rem',
            backgroundColor: '#2A2A2A',
            color: '#ECEBE5',
            border: 'none',
            letterSpacing: '-0.04rem',
            transition: 'all 300ms ease-in-out',

            '&:hover:not(:disabled)': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            },
            '&:focus': { boxShadow: 'none' },
            '&:focus-visible': { outline: 'none' }
        },

        '& .fc .fc-button-primary:not(:disabled).fc-button-active': {
            backgroundColor: '#2A2A2A',
            '&:hover': {
                backgroundColor: '#ECEBE5',
                color: '#2B2B2B'
            }
        },
        
        '& .fc .fc-button-primary:disabled': {
            backgroundColor: '#2A2A2A'
        },

        '& .fc .fc-timegrid-event .fc-event-time': {
            fontSize: '0.9rem'
        },

        '& .fc .fc-daygrid-dot-event': {
            padding: 0,
            fontSize: 10,
            fontWeight: theme.typography.fontWeightRegular,
            height: 12,
            marginLeft: 0
        },

        '& .fc .fc-daygrid-day-events': {
            marginTop: -5
        },

        '& .fc .fc-prev-button, & .fc .fc-next-button': {
            [theme.breakpoints.down('xs')]: { padding: '2px 3px' }
        }
    }
});

export default styles;