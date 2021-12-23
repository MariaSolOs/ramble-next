import { styled } from '@mui/material/styles';

import MuiAvatar from '@mui/material/Avatar';
import GradientButton from 'components/GradientButton';

export const Card = styled('div')(({ theme }) => ({
    backgroundColor: '#FFF',
    color: '#000',
    width: 250,
    height: 350,
    borderRadius: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 10px 0',
    margin: '10vh auto 0',
    
    [theme.breakpoints.down('sm')]: { 
        width: '80vw',
        marginTop: 40 
    }
}));

export const Avatar = styled(MuiAvatar)({
    width: 90,
    height: 90,
    border: '2.5px solid #C1C1C1'
});

export const CreatorName = styled('h3')({
    fontSize: '1.5rem',
    marginBottom: 0
});

export const Message = styled('p')(({ theme }) => ({
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.95rem',
    margin: '0 0 1.5rem',
    maxWidth: '80%'
}));

export const Button = styled(GradientButton)({
    borderRadius: 8,
    width: '70%'
});
