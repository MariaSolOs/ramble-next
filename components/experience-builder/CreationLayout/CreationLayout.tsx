import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useLanguageContext from 'context/languageContext';
import { CREATION_STEPS } from 'models/experience-interface';
import type { CreateLayoutProps } from './index';
import type { GradientButtonProps } from 'components/GradientButton';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Div100vh from 'react-div-100vh';
import CheckIcon from '@mui/icons-material/Check';
import GradientButton from 'components/GradientButton/GradientButton';
import menuIcon from 'public/images/menu-icon.svg';
import * as S from './CreationLayout.styled';

const CreationLayout: React.FC<CreateLayoutProps> = (props) => {
    const { CreateExperience: text } = useLanguageContext().appText;

    // The linear progress bar takes a value between 0 and 100
    const progressValue = (props.stepsCompleted / CREATION_STEPS.length) * 100;

    // The navbar is in a drawer in mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDrawer, setOpenDrawer] = useState(false);
    const expandDrawer = () => { setOpenDrawer(true); }
    const collapseDrawer = () => { setOpenDrawer(false); }

    // For closing the navigation drawer when resizing
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile]);

    const navbar = (
        <S.Navbar>
            {CREATION_STEPS.map((step, idx) => 
                <S.NavLink 
                key={uuid()}
                onClick={() => {
                    if (idx <= props.stepsCompleted) {
                        props.onNavigate(idx);
                        collapseDrawer();
                    }
                }}
                inactive={idx > props.stepsCompleted}>
                    {idx < props.stepsCompleted &&
                        <S.CheckIconContainer>
                            <CheckIcon sx={{ color: '#FFF', fontSize: 18 }} />
                        </S.CheckIconContainer>}
                    {text[step]}
                </S.NavLink>
            )}
        </S.Navbar>
    );

    return (
        <Div100vh>
            <S.Container>
                <Box sx={{ display: 'flex', height: 'calc(100% - 55px)' }}>
                    {isMobile ?
                        <S.NavbarDrawer
                        elevation={0}
                        open={openDrawer}
                        onClose={collapseDrawer}>
                            {navbar}
                        </S.NavbarDrawer> : navbar}
                    <S.PageContent>{props.children}</S.PageContent>
                </Box>
                <S.Footer>
                    <S.Progress variant="determinate" value={progressValue} />
                    <S.FooterButtons>
                        {isMobile &&
                            <S.NavbarToggler onClick={expandDrawer}>
                                <Image
                                src={menuIcon}
                                alt="Drawer toggler"
                                width={28}
                                height={28} />
                            </S.NavbarToggler>}
                        {props.currentStepIdx > 0 &&
                            <S.BackButton 
                            component="button"
                            onClick={props.onBack}>
                                {text.back}
                            </S.BackButton>}
                        <S.NextButton 
                        component={GradientButton}
                        { ...{
                            variant: 'experience',
                            // TODO: Comment this back
                            // disabled: !props.canContinue,
                            onClick: props.onNext
                        } as GradientButtonProps as any}>
                            {props.currentStep === 'review' ? text.submit : text.next}
                        </S.NextButton>
                    </S.FooterButtons>
                </S.Footer>
            </S.Container>
        </Div100vh>
    );
}

export default CreationLayout;