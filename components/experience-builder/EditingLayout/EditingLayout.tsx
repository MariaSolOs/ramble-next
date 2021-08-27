import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import { EDIT_STEPS } from 'models/experience-interface';
import type { EditingLayoutProps } from './index';

import Div100vh from 'react-div-100vh';
import Image from 'next/image';
import Drawer from '@material-ui/core/Drawer';
import GradientButton from 'components/GradientButton';
import menuIcon from 'public/images/menu-icon.svg';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './EditingLayout.styles';
const useStyles = makeStyles(styles);

const EditingLayout: React.FC<EditingLayoutProps> = (props) => {
    const { EditExperience: text } = useLanguageContext().appText;
    const theme = useTheme();
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);
    const expandDrawer = () => { setOpenDrawer(true); }
    const collapseDrawer = () => { setOpenDrawer(false); }

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // For closing the navigation drawer when resizing
    useEffect(() => {
        if (!isMobile) {
            collapseDrawer();
        }
    }, [isMobile]);

    const navbar = (
        <ul className={classes.navbar}>
            {EDIT_STEPS.map((step, idx) => {
                if (step === 'location' && props.isOnlineExperience) {
                    // For online experiences, hide the location step
                    return;
                } else {
                    return (    
                        <li 
                        key={uuid()} 
                        onClick={() => {
                            if (props.canContinue) {
                                collapseDrawer();
                                props.onNavigate(idx);
                            }
                        }}
                        className={`
                            ${classes.navLink}
                            ${!props.canContinue && classes.disabledLink}
                        `}>
                            {text[step]}
                        </li>
                    );
                }
            })}
        </ul>
    );
    
    return (
        <Div100vh>
            <div className={classes.root}>
                <div className={classes.pageContainer}>
                    {isMobile ?
                        <Drawer
                        elevation={0}
                        className={classes.navbarDrawer}
                        open={openDrawer}
                        onClose={collapseDrawer}>
                            {navbar}
                        </Drawer> :
                        navbar}
                    <div className={classes.pageContent}>{props.children}</div>
                </div>
                <footer className={classes.footer}>
                    {isMobile &&
                        <div 
                        onClick={expandDrawer}
                        className={classes.navbarToggler}>
                            <Image
                            src={menuIcon}
                            alt="Drawer toggler"
                            width={28}
                            height={28} />
                        </div>}
                    <button 
                    disabled={!props.canContinue}
                    onClick={props.onSave}
                    className={`${classes.footerButton} ${classes.saveButton}`}>
                        {text.saveChanges}
                    </button>
                    {props.currentStep !== 'location' &&
                        <button
                        disabled={!props.canContinue}
                        className={`${classes.footerButton} ${classes.backButton}`}
                        onClick={props.onBack}>
                            {text.back}
                        </button>}
                    {props.currentStep !== 'price' && 
                        <GradientButton 
                        disabled={!props.canContinue}
                        className={`${classes.footerButton} ${classes.nextButton}`} 
                        variant="experience"
                        onClick={props.onNext}>
                            {text.next}
                        </GradientButton>}
                </footer>
            </div>
        </Div100vh>
    );
}

export default EditingLayout;