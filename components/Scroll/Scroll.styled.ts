import { styled } from '@mui/material/styles';

import CustomScroll from 'react-custom-scroll';
import 'react-custom-scroll/dist/customScroll.css';

export const Scroll = styled(CustomScroll)({
    '&.rcs-custom-scroll .rcs-custom-scrollbar': { opacity: 1 },
    
    '&.rcs-custom-scroll .rcs-inner-handle': {
        background: 'linear-gradient(to bottom, #1A1A1A, #5B5B5B)'
    }
});

export default Scroll;
