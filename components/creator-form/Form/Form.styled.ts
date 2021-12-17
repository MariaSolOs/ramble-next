import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dropzone from 'components/Dropzone';
import BaseTip from 'components/Tip';
import TextField from 'components/TextField';
import GradientButton from 'components/GradientButton';

export const Title = styled('h2')(({ theme }) => ({
    color: '#FFF',
    fontSize: '1.9rem',
    margin: 0,
    
    [theme.breakpoints.down('md')]: { fontSize: '1.5rem' }
}));

export const Subtitle = styled('h5')(({ theme }) => ({
    color: '#ECEBE5',
    fontSize: '1.1rem',
    margin: 0,
    
    [theme.breakpoints.down('md')]: { fontSize: '1rem' }
}));

export const FormContent = styled('div')(({ theme }) => ({
    width: '80vw',
    margin: '0 auto',
    
    [theme.breakpoints.down('md')]: { width: '90vw' },
    [theme.breakpoints.down('sm')]: { 
        width: '100vw',
        padding: '0 30px 0 32px',
        boxSizing: 'border-box'
    }
}));

export const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    margin: '0 0 50px -26px',

    [`& ${Subtitle}`]: {
        fontSize: '1.25rem',

        [theme.breakpoints.down('md')]: { fontSize: '1.1rem' }
    }
}));

export const HeaderGradient = styled('div')({
    backgroundColor: '#F6D327',
    backgroundImage: 'linear-gradient(315deg, #f6d327 0%, #de4daa 74%)',
    padding: 5,
    marginRight: 16,
    borderRadius: '1.5rem'
});

export const PhotoDropzone = styled(Dropzone)(({ theme }) => ({
    borderRadius: '100%',
    margin: '20px 0 0 20px',
    height: 200,
    width: 200,
    backgroundColor: '#222',
    position: 'relative',

    [theme.breakpoints.down('sm')]: { margin: '20px auto' },

    '& img.preview': {
        objectFit: 'cover',
        borderRadius: '100%',
        margin: 0,
        height: 200,
        width: 200
    }
}));

export const AddIcon = styled(AddCircleIcon)({
    fontSize: 46,
    color: '#808080',
    position: 'absolute',
    top: 'calc(100px - 23px)',
    left: 'calc(100px - 23px)',
    transition: 'all 300ms ease-in-out',
    cursor: 'pointer',

    '&:hover': { 
        color: '#CDCDCD',
        transform: 'scale(1.04)',
    }
});

export const DeleteIcon = styled(HighlightOffIcon)({
    position: 'absolute',
    top: 0, 
    right: 5,
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#808080',
    transition: 'all 200ms ease-in-out',

    '&:hover': { color: '#FFF' }
});

export const FieldContainer = styled('div')(({ theme }) => ({
    margin: '50px 0',
    width: '60vw',
    
    [theme.breakpoints.down('lg')]: { width: 700 },
    [theme.breakpoints.down('md')]: { width: '100%' }
}));

export const AboutYouTextField = styled(TextField)(({ theme }) => ({
    width: '90%',

    [theme.breakpoints.down('sm')]: { width: '100%' },

    '& .MuiInputBase-multiline': {
        padding: '1rem',
        borderRadius: 10
    },

    '& .MuiOutlinedInput-input': { padding: 0 },

    '& .MuiInputAdornment-positionEnd': {
        margin: 0,
        position: 'absolute',
        bottom: 15, 
        right: 15,
        fontSize: '0.8rem'
    }
}));

export const PhoneTextField = styled(TextField)(({ theme }) => ({
    marginTop: 20,
    width: 250,

    [theme.breakpoints.down('sm')]: { width: '100%' },

    '& .MuiOutlinedInput-root': { borderRadius: 10 }
}));

export const IdsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    margin: '2rem 0',
    width: 500,
    justifyContent: 'space-between',
    
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        margin: '1rem 0 0'
    }
}));

export const IdDropzoneContainer = styled('div')(({ theme }) => ({
    width: 220,
    height: 180,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down('md')]: { marginBottom: 30 },
    
    [`& ${AddIcon}`]: { position: 'unset' },
    
    [`& ${DeleteIcon}`]: {
        position: 'absolute',
        top: 0,
        right: 0
    }
}));

export const IdDropzone = styled(Dropzone)({
    borderRadius: '1rem',
    backgroundColor: '#222',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',
    width: '100%',

    '& img.preview': {
        borderRadius: '1rem',
        height: '85%',
        maxWidth: '90%'
    }
});

export const IdDropzoneTitle = styled('p')({
    color: '#CDCDCD',
    fontSize: '0.85rem',
    textAlign: 'center',
    margin: '0 auto',
    height: '10%'
});

export const IdDropzoneSubtitle = styled(IdDropzoneTitle)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '0.75rem',
    marginBottom: '5%'
}));

export const IdDropzoneText = styled('span')({ color: '#808080' });

export const Footer = styled('footer')({
    width: '100vw',
    backgroundColor: '#1C1C1C',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
});

export const DoneButton = styled(GradientButton)({
    minWidth: 100,
    marginRight: 20,
    height: 35,
    
    '&:disabled': { filter: 'brightness(70%)' }
});

export const Tip = styled(BaseTip)(({ theme }) => ({
    [theme.breakpoints.down('md')]: { 
        fontSize: '0.85rem',
        margin: '5px 0'
    }
}));
