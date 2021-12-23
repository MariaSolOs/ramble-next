import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useLanguageContext from 'context/languageContext';
import { EDIT_STEPS } from 'models/experience-interface';
import type { EditStep } from 'models/experience-interface';
import type { GradientButtonProps } from 'components/GradientButton';
import type { EditingLayoutProps } from './index';

import Div100vh from 'react-div-100vh';
import Box from '@mui/material/Box';
import Image from 'next/image';
import GradientButton from 'components/GradientButton';
import menuIcon from 'public/images/menu-icon.svg';
import * as S from './EditingLayout.styled';

const EditingLayout: React.FC<EditingLayoutProps> = (props) => {
    const { EditExperience: text } = useLanguageContext().appText;
    const theme = useTheme();

    const [openDrawer, setOpenDrawer] = useState(false);
    const expandDrawer = () => { setOpenDrawer(true); }
    const collapseDrawer = () => { setOpenDrawer(false); }

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const firstStep: EditStep = props.isOnlineExperience ? 'planning' : 'location';
    const lastStep: EditStep = 'price';

    // For closing the navigation drawer when resizing
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile]);

    const navbar = (
        <S.Navbar>
            {EDIT_STEPS.map((step, idx) => {
                if (step === 'location' && props.isOnlineExperience) {
                    // For online experiences, hide the location step
                    return;
                } else {
                    return (    
                        <S.NavLink
                        key={uuid()} 
                        onClick={() => {
                            if (props.canContinue) {
                                collapseDrawer();
                                props.onNavigate(idx);
                            }
                        }}
                        disabled={!props.canContinue}>
                            {text[step]}
                        </S.NavLink>
                    );
                }
            })}
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
                    {isMobile &&
                        <S.NavbarToggler onClick={expandDrawer}>
                            <Image
                            src={menuIcon}
                            alt="Drawer toggler"
                            width={28}
                            height={28} />
                        </S.NavbarToggler>}
                    <S.FooterButton
                    component="button"
                    sx={{ mr: 'auto', p: '0 1rem', backgroundColor: '#6B6B6B' }}
                    {...{
                        disabled: !props.canContinue,
                        onClick: props.onSave
                    } as React.ButtonHTMLAttributes<HTMLButtonElement> as any}>
                        {text.saveChanges}
                    </S.FooterButton>
                    {props.currentStep !== firstStep &&
                        <S.FooterButton
                        component="button"
                        sx={{ background: 'radial-gradient(circle at 96%, #2E2E2E, #6F6F6F)' }}
                        {...{
                            disabled: !props.canContinue,
                            onClick: props.onBack
                        } as React.ButtonHTMLAttributes<HTMLButtonElement> as any}>
                            {text.back}
                        </S.FooterButton>}
                    {props.currentStep !== lastStep && 
                        <S.FooterButton
                        component={GradientButton}
                        sx={{ ml: '10px' }}
                        {...{
                            disabled: !props.canContinue,
                            variant: 'experience',
                            onClick: props.onNext
                        } as GradientButtonProps as any}>
                            {text.next}
                        </S.FooterButton>}
                </S.Footer>
            </S.Container>
        </Div100vh>
    );
}

export default EditingLayout;