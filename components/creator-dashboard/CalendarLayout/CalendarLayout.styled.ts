import { styled } from '@mui/material/styles';

export const Container = styled('main')(({ theme }) => ({
    height: 'calc(100% - 73px - 1rem)',
    width: '100%',
    display: 'flex',
    margin: '0 auto 1rem',
    maxWidth: 1300,
    
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        height: 'calc(100% - 67px - 1rem)'
    }
}));

export const InfosContainer = styled('div')({
    width: '38%',
    marginLeft: '2%',
    height: '100%'
});