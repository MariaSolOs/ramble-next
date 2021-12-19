import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const Container = styled('div')(({ theme }) => ({
    width: '80vw',
    margin: '90px auto 30px',
    
    [theme.breakpoints.down('sm')]: {
        width: '95vw',
        margin: '75px auto 0'
    }
}));

export const Photo = styled(Box)(({ theme }) => ({
    width: 130,
    height: 130,
    marginRight: 30,
    
    '&.MuiAvatar-colorDefault': {
        backgroundColor: '#FFF',
        fontSize: '2.5rem',
        color: '#000'
    },
    
    [theme.breakpoints.down('sm')]: {
        width: 95,
        height: 95,
        marginRight: 20
    }
}));

export const PhotoDropzone = styled(Photo)(({ theme }) => ({
    backgroundColor: '#FFF',
    borderRadius: '50%',
    position: 'relative',

    '& img.preview': {
        borderRadius: '50%',
        objectFit: 'cover',
        width: 130,
        height: 130,
        marginRight: 30,
        
        [theme.breakpoints.down('sm')]: {
            width: 95,
            height: 95,
            marginRight: 20
        }
    }
}));

export const Name = styled('h3')({
    color: '#E6E6E6',
    margin: 0,
    fontSize: '1.8rem'
});

export const City = styled('p')(({ theme }) => ({
    color: '#ACACAC',
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: theme.typography.fontWeightRegular
}));

export const Nav = styled('nav')(({ theme }) => ({
    marginTop: 30,

    [theme.breakpoints.down('sm')]: { marginRight: 20 }
}));

export const NavLink = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    color: '#ACACAC',
    fontSize: '1.2rem',
    whiteSpace: 'nowrap',
    transition: 'all 200ms ease-in-out',
    
    '&:first-of-type': {
        marginRight: 50,

        [theme.breakpoints.down('sm')]: { marginRight: 30 }
    },
    
    '&:hover': { color: '#FFF' },
    
    [theme.breakpoints.down('sm')]: { fontSize: '1rem' }
}));

export const AddPhotoIcon = styled(AddAPhotoIcon)({
    color: '#000',
    position: 'absolute',
    top: 'calc(50% - 1.5rem)',
    left: 'calc(50% - 1.5rem)',
    fontSize: '3rem',
    cursor: 'pointer'
});

export const DeletePhotoIcon = styled(HighlightOffIcon)(({ theme }) => ({
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: -10,
    
    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' }
}));