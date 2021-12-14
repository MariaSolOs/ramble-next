import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradientButton from 'components/GradientButton';

export const Container = styled('div')(({ theme }) => ({
    height: 'calc(100vh - 100px)',
    marginTop: 100,
    width: '100vw',
    backgroundColor: '#000',
    display: 'flex',
    
    [theme.breakpoints.down('md')]: { height: 'auto' }
}));

export const GreyText = styled(Box)({
    color: '#CCCCCE',
    margin: 0,
    fontSize: '1rem'
});

export const WhiteText = styled(Box)({
    margin: '0 0 10px',
    fontSize: '1.7rem'
});

export const SectionTitle = styled('h4')({
    color: '#CCCCCE',
    fontSize: '1.3rem',
    margin: '1.8rem 0 5px'
});

export const AllCaps = styled(GreyText)(({ theme }) => ({
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightRegular,
    margin: '5px 0 10px',
    fontSize: '0.9rem'
}));

export const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    marginTop: 20,
    lineHeight: 1.1,
    height: 'fit-content',
    
    [`& ${GreyText}`]: { fontSize: '1.25rem' },
    
    [theme.breakpoints.down('sm')]: {
        [`& ${WhiteText}`]: { fontSize: '1.2rem' },
        [`& ${GreyText}`]: { fontSize: '1rem' }
    }
}));

export const HeaderGradient = styled('div')({
    backgroundImage: 'linear-gradient(to bottom, #2BB282 0%, #2D73EA 100%)',
    padding: 4,
    borderRadius: '1.5rem',
    marginRight: 10
});

export const SummaryContainer = styled('div')(({ theme }) => ({
    height: 380,
    display: 'flex',
    marginTop: 40,
    
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        height: 'auto'
    }
}));

export const ExperienceImage = styled('div')(({ theme }) => ({
    height: '100%',
    width: 'auto',
    minWidth: 280,
    borderRadius: '2rem',
    marginLeft: 18,
    maxWidth: '45%',
    position: 'relative',
    overflow: 'hidden',
    
    [theme.breakpoints.down('md')]: {
        height: 300,
        margin: '0 auto 20px',
        maxWidth: '100%'
    }
}));

export const BookingContainer = styled(Box)(({ theme }) => ({
    width: '50%',
    margin: '0 5%',
    
    [theme.breakpoints.down('md')]: { width: '90%' }
}));

export const Icon = styled(FontAwesomeIcon)({
    fontSize: '1.3rem',
    marginRight: 10
});

export const HostInfo = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 240
});

export const PriceRow = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    margin: '1.8rem 0 5px',

    [`& ${WhiteText}`]: { fontSize: '1.2rem' }
});

export const Button = styled(GradientButton)(({ theme }) => ({
    minWidth: 78,
    height: 35,
    alignSelf: 'flex-end',
    
    [theme.breakpoints.down('md')]: { margin: '10px 0 20px' }
}));
