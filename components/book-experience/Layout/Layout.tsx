import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useLanguageContext from 'context/languageContext';
import type { LayoutProps } from './index';

import Experience from 'components/Experience';
import Scroll from 'components/Scroll';
import GradientButton from 'components/GradientButton';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const Layout: React.FC<LayoutProps> = (props) => {
    const { BookExperience_Layout: text } = useLanguageContext().appText;
    const classes = useStyles({
        nextButtonWidth: props.nextButtonWidth || '100%'
    });

    // For hiding the experience preview on smaller screens
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // The titles on the header depend on the current step
    const getHeader = () => {
        switch (props.currentStep) {
            case 'date':
            case 'time':
                return (
                    <>
                        <h5 className={classes.stepTitle}>
                            {text.dateAndTime}
                        </h5>
                        <p className={classes.stepSubtitle}>
                            {text.completeBooking}
                        </p>
                        <p className={classes.stepSubtitle}>
                            {text.payment}
                        </p>
                    </>
                );
            case 'bookingType':
                return (
                    <>
                        <h5 className={classes.stepTitle}>
                            {text.completeBooking}
                        </h5>
                        <p className={classes.stepSubtitle}>
                            {text.payment}
                        </p>
                    </>
                );
            case 'payment':
                return (
                    <h5 className={classes.stepTitle}>
                        {text.payment}
                    </h5>
                );
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <ChevronLeftRoundedIcon 
                className={classes.goBackButton}
                onClick={props.onGoBack} />
                {getHeader()}
            </div>
            <div className={classes.mainBody}>
                {!isMobile && 
                    <div className={classes.experienceWindow}>
                        <Scroll heightRelativeToParent="100%">
                            <div className={classes.experienceContainer}>
                                <Experience
                                experience={props.experience}
                                useMobileDisplay />
                            </div>
                        </Scroll>
                    </div>}
                <div className={classes.formPage}>
                    <div className={classes.formContent}>
                        {props.children}
                    </div>
                    <GradientButton 
                    variant="experience"
                    className={classes.nextButton}
                    disabled={!props.canContinue}
                    onClick={props.onGoNext}>
                        {props.currentStep === 'payment' ?
                            `${text.completeBooking} \u2022 $${props.bookingPrice?.toFixed(2)}` 
                            : text.next}
                    </GradientButton>
                </div>
            </div>
        </div>
    );
}

export default Layout;