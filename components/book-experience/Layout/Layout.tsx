import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useLanguageContext from 'context/languageContext';
import type { LayoutProps } from './index';

import Box from '@mui/material/Box';
import Experience from 'components/Experience';
import Scroll from 'components/Scroll';
import * as S from './Layout.styled';

const Layout: React.FC<LayoutProps> = (props) => {
    const { BookExperience_Layout: text } = useLanguageContext().appText;

    // For hiding the experience preview on smaller screens
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // The titles on the header depend on the current step
    const getHeader = () => {
        switch (props.currentStep) {
            case 'date':
            case 'time':
                return (
                    <>
                        <S.StepTitle>{text.dateAndTime}</S.StepTitle>
                        <S.StepSubtitle>{text.completeBooking}</S.StepSubtitle>
                        <S.StepSubtitle>{text.payment}</S.StepSubtitle>
                    </>
                );
            case 'bookingType':
                return (
                    <>
                        <S.StepTitle>{text.completeBooking}</S.StepTitle>
                        <S.StepSubtitle>{text.payment}</S.StepSubtitle>
                    </>
                );
            case 'payment':
                return <S.StepTitle>{text.payment}</S.StepTitle>;
        }
    }

    return (
        <Box sx={{ m: '80px auto 0', width: { xs: '95vw', md: '80vw' } }}>
            <S.Header>
                <S.GoBackButton onClick={props.onGoBack} />
                {getHeader()}
            </S.Header>
            <Box sx={{ display: 'flex' }}>
                {!isMobile &&
                    <Box sx={{ height: 450, width: 380, ml: 5.625 }}>
                        <Scroll heightRelativeToParent="100%">
                            <Box sx={{ width: 350, '& .image-gallery-image': { minHeight: 330 }}}>
                                <Experience
                                experience={props.experience}
                                previewMode />
                            </Box>
                        </Scroll>
                    </Box>}
                <Box sx={{ width: { xs: '100%', sm: 470 }, m: { xs: '0 auto', md: '0 0 0 100px' } }}>
                    <Box sx={{ minHeight: { xs: 0, sm: 400 } }}>
                        {props.children}
                    </Box>
                    <S.NextButton
                    variant="experience"
                    disabled={!props.canContinue} 
                    onClick={props.onGoNext}
                    sx={{ width: props.nextButtonWidth }}>
                        {props.currentStep === 'payment' ? 
                            `${text.completeBooking} \u2022 $${props.bookingPrice?.toFixed(2)}` 
                            : text.next}
                    </S.NextButton>
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;