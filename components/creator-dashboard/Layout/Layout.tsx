import React from 'react';
import { useRouter } from 'next/router';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { NavLinkProps } from './index';

import Link from 'next/link';
import Div100vh from 'react-div-100vh';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const NavLink = (props: NavLinkProps) => {
    const currentPage = useRouter().asPath;
    const classes = useStyles();

    return (
        <Link href={props.link.href} as={props.link.as} passHref>
            <a className={`
                ${classes.navButton} 
                ${currentPage === props.link.as && classes.activeButton}
            `}>
                {props.title}
            </a>
        </Link>
    );
}

const Layout: React.FC = (props) => {
    const { CreatorDashboard_Layout: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <Div100vh>
            <div className={classes.root}>
                <h3 className={classes.dashboardTitle}>{text.dashboardTitle}</h3>
                <NavLink link={routes.bookingRequests} title={text.bookingRequests} />
                <NavLink link={routes.creatorCalendar} title={text.calendar} />
                <NavLink link={routes.createdExperiences} title={text.createdExperiences} />
                {props.children}
            </div>
        </Div100vh>
    );
}

export default Layout;