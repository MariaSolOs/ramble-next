import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled('div')(({ theme }) => ({
    margin: '50px auto 0',
    width: '60vw',
    fontFamily: theme.typography.questrial.fontFamily,
    
    [theme.breakpoints.down('md')]: { width: '80vw' }
}));

export const Subtitle = styled(Box)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightBold,
    margin: '8px 0 0',
    display: 'block'
}));

export const Media = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0'
});

export const MediaIcon = styled(FontAwesomeIcon)({
    color: '#C0BFBA',
    fontSize: '1.8rem',
    marginRight: 10
});

export const ShareFab = styled(Fab)({
    color: 'whitesmoke',
    backgroundColor: '#656565',
    width: 40,
    height: 40,
    minHeight: 0,
    
    '&:hover': { backgroundColor: '#656565' }
});

export const ShareIcon = styled(FontAwesomeIcon)({
    fontSize: '1.15rem',
    color: 'whitesmoke'
});

export const Paragraph = styled('p')(({ theme }) => ({
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '1.1rem'
}));

export const Footer = styled('footer')({
    display: 'flex',
    justifyContent: 'center',
    margin: '70px auto 50px'
});