import { styled } from '@mui/material/styles';

export const Calendar = styled('div')(({ theme }) => ({
    height: '100%',
    width: '60%',
    
    [theme.breakpoints.down('md')]: { 
        width: '100%',
        height: 'calc(100% - 51.19px)' 
    },
    
    '& .fc .fc-toolbar-chunk': {
        display: 'flex',
        alignItems: 'flex-end',
        margin: 0
    },
    
    '& .fc .fc-toolbar.fc-header-toolbar': {
        margin: '8px 0'
    },
    
    '& .fc .fc-toolbar-title': {
        marginRight: 10,
        fontSize: '1.2rem'
    },
    
    '& .fc .fc-button': {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: '0.75rem',
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
    
    '& .fc .fc-button-primary:disabled': {
        backgroundColor: '#2A2A2A',
        cursor: 'not-allowed'
    },
    
    '& .fc .fc-daygrid-day-frame, & .fc .fc-highlight': {
        backgroundColor: '#323232'
    },
    
    '& .fc .fc-col-header-cell': {
        backgroundColor: '#323232',
        textAlign: 'right',
        fontWeight: theme.typography.fontWeightRegular
    },
    
    '& .fc .fc-scrollgrid-liquid': {
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderCollapse: 'collapse'
    },
    
    '& .fc td, & .fc th, & .fc .fc-scrollgrid-liquid': {
        borderColor: '#404040'
    },
    
    '& .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events': {
        overflowX: 'hidden'
    },
    
    '& .fc .fc-daygrid-dot-event': { 
        padding: 0,
        
        [theme.breakpoints.down('sm')]: { fontSize: '0.75rem' }
    },
    
    '& .fc .fc-daygrid-day-bottom': { whiteSpace: 'nowrap' }
}));

export const SlotBullet = styled('span')({
    borderRadius: '50%',
    width: 8,
    height: 8,
    minWidth: 8,
    marginRight: 4
});