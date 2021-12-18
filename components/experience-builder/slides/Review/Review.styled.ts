import { styled } from '@mui/material/styles';

export { Title } from 'components/experience-builder/slides/Shared.styled';

export const ExperienceContainer = styled('div')(({ theme }) => ({
    width: 450, 
    height: '90%',
    overflowY: 'scroll',

    [theme.breakpoints.down('sm')]: { 
        width: '100%',
        height: 'auto',
        overflowY: 'unset',
    }
}));