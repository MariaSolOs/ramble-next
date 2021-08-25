import React from 'react';
import { useRouter } from 'next/router';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { LayoutProps } from './index';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const Layout: React.FC<LayoutProps> = (props) => {
    const { ExperienceDetails: text } = useLanguageContext().appText;
    const router = useRouter();
    const classes = useStyles();

    return (
        <>
            <div className={classes.experienceContainer}>
                {props.children}
            </div>
            <footer className={classes.footer}>
                <ArrowBackRoundedIcon
                className={classes.goBackIcon}
                onClick={() => router.back()} />
                <p className={classes.footerPriceInfo}>
                    <span className={classes.footerPrice}>
                        ${props.experiencePrice}
                    </span>
                    {props.isOnlineExperience ? text.perConnection : text.perPerson}
                </p>
                <GradientButton
                variant="experience"
                className={classes.bookingButton}
                { ...routes.bookExperience(props.experienceId) }>
                    {text.bookExperience}
                </GradientButton>
            </footer>
        </>
    );
}

export default Layout;