import React from 'react';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';

import Div100vh from 'react-div-100vh';
import NavLink from 'components/NavLink';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Layout.styles';
const useStyles = makeStyles(styles);

const Layout: React.FC = (props) => {
    const { CreatorDashboard_Layout: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <Div100vh>
            <div className={classes.root}>
                <h3 className={classes.dashboardTitle}>{text.dashboardTitle}</h3>
                <NavLink 
                link={routes.bookingRequests}
                className={classes.navButton} 
                activeClassName={classes.activeButton}>
                    {text.bookingRequests}
                </NavLink>
                <NavLink 
                link={routes.creatorCalendar}
                className={classes.navButton} 
                activeClassName={classes.activeButton}>
                    {text.calendar}
                </NavLink>
                <NavLink 
                link={routes.createdExperiences}
                className={classes.navButton} 
                activeClassName={classes.activeButton}>
                    {text.createdExperiences}
                </NavLink>
                {props.children}
            </div>
        </Div100vh>
    );
}

export default Layout;