import { styled } from '@mui/material/styles';

export const Title = styled('h3')(({ theme }) => ({
    fontSize: '1.5rem',
    margin: '0 0 1rem',
    textTransform: 'capitalize',

    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
}));

export const Calendar = styled('div')(({ theme }) => ({
    '& .fc td, & .fc th, & .fc .fc-scrollgrid-liquid': {
        border: 'none'
    },
    
    '& .fc.fc-media-screen': {
        width: 330,
        margin: '0 auto',
    
        [theme.breakpoints.down('sm')]: { maxWidth: '100%' }
    },
    
    '& .fc .fc-scrollgrid-section-body table': {
        overflow: 'hidden'
    },
    
    '& .fc .fc-day-disabled .fc-daygrid-day-frame': {
        cursor: 'not-allowed',
        opacity: 0.3,
        height: 40,
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: 15
    },
    
    '& .fc .fc-day-disabled': { 
        backgroundColor: 'transparent'
    },
    
    '& .fc .fc-daygrid-day-frame, & .fc .fc-daygrid-day-top': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    
    '& .fc .fc-toolbar-title': {
        fontSize: '1.3rem',

        [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
    },
    
    '& .fc .fc-toolbar-chunk': {
        display: 'flex',
        alignItems: 'center'
    },
    
    '& .fc .fc-col-header-cell': {
        color: '#CDCDCD'
    },
    
    '& .fc .fc-daygrid-day.fc-day-today:not(.selected-date)': {
        backgroundColor: 'transparent'
    },
    
    '& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events': {
        display: 'none'
    },
    
    '& .fc .fc-button': {
        backgroundColor: '#2A2A2A',
        color: '#ECEBE5',
        border: 'none',
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
    
    '& .fc .fc-prev-button, & .fc .fc-next-button': {
        padding: '5px 9px',
        
        [theme.breakpoints.down('sm')]: { padding: '2px 3px' }
    },
    
    '& .fc .fc-highlight': { background: 'none' },

    '& .bookable-date': {
        '& .fc-daygrid-day-frame': {
            fontWeight: theme.typography.fontWeightBold,
            height: 40,
            cursor: 'pointer',
            borderRadius: '50%',
        
            '&:hover': {
                transition: 'all 300ms ease-in-out',
                backgroundColor: '#FFF',
                color: '#2A2A2A'
            }
        }
    },

    '& .selected-date': {
        backgroundColor: '#FFF !important',
        color: '#2A2A2A',
        borderRadius: '50%'
    }
}));

export const TimezoneMessage = styled('p')(({ theme }) => ({
    margin: '8px auto',
    width: 330,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.8rem',
    
    [theme.breakpoints.down('sm')]: { maxWidth: '100%' }
}));
