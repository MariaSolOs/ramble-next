import { styled } from '@mui/material/styles';

import ExperienceCard from 'components/ExperienceCard';
import BaseTip from 'components/Tip';

export const Tip = styled(BaseTip)(({ theme }) => ({
    margin: '30px 0 0 10px',
    
    [theme.breakpoints.down('sm')]: { margin: '20px 0 0 5px' }
}));

export const Experiences = styled('div')(({ theme }) => ({
    display: 'flex',
    margin: '2rem 0 2rem 10px',
    overflowX: 'scroll',
    
    [theme.breakpoints.down('sm')]: {
        overflowX: 'hidden',
        overflowY: 'scroll',
        margin: '30px auto',
        width: '90vw',
        flexWrap: 'wrap'
    }
}));

export const Card = styled(ExperienceCard)(({ theme }) => ({
    width: 230,
    height: 275,
    marginRight: 30,
    flexShrink: 0,
    
    [theme.breakpoints.down('sm')]: { 
        maxWidth: 240,
        margin: '0 calc((100% - 240px) / 2) 20px'
    }
}));