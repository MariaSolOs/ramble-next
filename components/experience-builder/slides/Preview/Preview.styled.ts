import { styled } from '@mui/material/styles';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BaseDropzone from 'components/Dropzone';

export * from 'components/experience-builder/slides/Shared.styled';

export const DropzoneContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: '2rem',
    
    [theme.breakpoints.down('sm')]: { 
        flexWrap: 'wrap',
        width: 300,
        margin: '2rem auto'
    }
}));

export const DropzoneItem = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: 140,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    
    [theme.breakpoints.down('lg')]: { marginRight: 15 },
    [theme.breakpoints.down('md')]: { 
        marginRight: 10,
        width: 130 
    },
    [theme.breakpoints.down('sm')]: { 
        margin: '0 auto 40px',
        width: 140
    }
}));

const PictureText = styled('p')({
    color: '#CDCDCD',
    fontSize: '0.85rem',
    textAlign: 'center',
    width: '90%'
});

export const PictureTitle = styled(PictureText)(({ theme }) => ({
    margin: 0,
    fontWeight: theme.typography.fontWeightBold,
    height: '6%'
}));

export const PictureDescription = styled(PictureText)(({ theme }) => ({
    margin: '0 0 10px',
    fontWeight: theme.typography.fontWeightRegular,
    height: '20%',
    fontSize: '0.8rem'
}));

export const Dropzone = styled(BaseDropzone)({
    borderRadius: '1rem',
    backgroundColor: '#2F2E2E',
    width: '100%',
    height: 'calc(74% - 10px)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& img.preview': {
        maxWidth: '95%',
        height: 'auto',
        maxHeight: '70%',
        objectFit: 'contain'
    }
});

export const AddButton = styled(AddCircleIcon)({
    fontSize: '3rem',
    color: '#808080',
    cursor: 'pointer',
    '&:hover': { 
        color: '#CDCDCD',
        transform: 'scale(1.05)',
        transition: 'transform 300ms ease-in-out'
    }
});

export const DeleteButton = styled(HighlightOffIcon)({
    position: 'absolute',
    top: 5, 
    right: 5,
    cursor: 'pointer',
    transition: 'color 300ms ease-in-out',
    color: '#000',
    width: 20,
    height: 20,
    '&:hover': { color: '#FFF' }
});
