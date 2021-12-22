import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    margin: '2rem 0 1rem',
    height: 'calc(100% - 73px - 3rem)',
    overflowX: 'scroll',
    
    [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
        height: 'auto',
        margin: '1rem 0 0'
    }
}));