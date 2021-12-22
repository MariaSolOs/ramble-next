import { styled } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import MuiDialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const Container = styled('div')({
    backgroundColor: '#323232',
    marginTop: 44.406,
    height: 'calc(62% - 44.406px)',
    borderRadius: 10,
    overflowY: 'scroll'
});

export const Title = styled('h3')(({ theme }) => ({
    margin: 0,
    fontSize: '1.1rem',
    padding: 8,
    zIndex: 5,
    backgroundColor: '#323232',
    position: 'sticky',
    top: 0,
    display: 'flex',
    
    [theme.breakpoints.down('md')]: { fontSize: '1.2rem' },
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const CloseDialogButton = styled('button')({
    background: 'none',
    margin: '0 0 0 auto',
    color: '#ECEBE5',
    border: 'none',
    letterSpacing: '-0.04rem'
});

export const Slot = styled('div')({
    position: 'relative',
    padding: '5px 8px 1rem',
    transition: 'background-color 300ms ease-in-out',
    borderBottom: 'solid 0.5px #404040',
    
    '&:hover': { backgroundColor: '#4B4B4B' }
});

export const SlotTitle = styled('h3')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    margin: '10px 0 0',

    [theme.breakpoints.down('sm')]: { fontSize: '0.9rem' }
}));

export const SlotInfo = styled('p')(({ theme }) => ({
    margin: '0 0 0 20px',
    fontSize: '0.85rem',
    
    [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' }
}));

export const SlotBullet = styled('span')({
    borderRadius: '50%',
    minWidth: 8,
    width: 15,
    height: 15,
    marginRight: 5
});

export const ClientList = styled('ul')({
    listStyle: 'none',
    paddingLeft: 20,
    margin: '8px 0 0'
});

export const ClientItem = styled('li')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5
});

export const ClientAvatar = styled(Avatar)({
    marginRight: 5,
    width: 30,
    height: 30,
    fontSize: '0.8rem'
});

export const PrivateBooking = styled('div')({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '0.8rem'
});

export const DeleteSlotButton = styled(HighlightOffIcon, {
    shouldForwardProp: prop => prop !== 'disabled'
})<SvgIconProps & { disabled: boolean; }>(({ disabled }) => ({
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: '1rem',
}));

export const Dialog = styled(MuiDialog)({
    '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        color: 'inherit'
    }
});
