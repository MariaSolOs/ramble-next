import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import routes from 'routes';

import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import LanguageIcon from '@material-ui/icons/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import AppBar from 'components/AppBar';
import NavbarProfileMenu from 'components/NavbarProfileMenu';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Navbar.styles';
const useStyles = makeStyles(styles);

const Navbar = () => {
    const { appText, toggleLanguage } = useLanguageContext();
    const { Navbar: text } = appText;
    const classes = useStyles();
    const { uiDispatch } = useUiContext();

    const [session] = useSession();
    const isLoggedIn = Boolean(session?.user.userId);
    const isCreator = Boolean(session?.user.creatorId);
    const userName = session?.user.firstName || '';
    const userPhoto = session?.user.photo;

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const closeMenu = () => { setAnchorEl(null); }
    
    // Close menu when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, []);

    const profileMenu = (
        <NavbarProfileMenu
        userName={userName}
        userPhoto={userPhoto}
        onClose={closeMenu}
        isCreator={isCreator} />
    );

    return (
        <AppBar>
            <nav className={classes.root}>
                <div className={classes.collapsedNav}>
                    <IconButton 
                    disableRipple 
                    onClick={e => setAnchorEl(e.currentTarget)}>
                        <FontAwesomeIcon
                        icon={faAngleDoubleDown}
                        className={classes.toggleIcon} />
                    </IconButton>
                    <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    className={classes.menu}>
                        <MenuItem>
                            <Link 
                            passHref 
                            href={isCreator ? 
                                routes.bookingRequests.href : 
                                routes.becomeACreator.href
                            }>
                                <a onClick={closeMenu} className={classes.menuLink}>
                                    {isCreator ? text.creatorDashboard : text.becomeCreator}
                                </a>
                            </Link>
                        </MenuItem>
                        {isLoggedIn ? 
                            <MenuItem className={classes.profileButton}>
                                {profileMenu}
                            </MenuItem> :
                            [<MenuItem
                            key={0}
                            component="button"
                            className={classes.menuLink}
                            onClick={() => {
                                uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' });
                                closeMenu();
                            }}>
                                {text.signUp}
                            </MenuItem>,
                            <MenuItem
                            key={1}
                            component="button"
                            className={classes.menuLink}
                            onClick={() => {
                                uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
                                closeMenu();
                            }}>
                                {text.logIn}
                            </MenuItem>]}
                    </Menu>
                </div>
                <div className={classes.expandedLinks}>
                    {!isLoggedIn &&
                        <Chip
                        icon={<LanguageIcon />}
                        label={text.languageChip}
                        className={classes.languageChip}
                        clickable
                        onClick={toggleLanguage} />}
                    <Link 
                    passHref 
                    href={isCreator ? 
                        routes.bookingRequests.href : 
                        routes.becomeACreator.href
                    }>
                        <a className={`${classes.expandedLink} ${classes.whiteNavLink}`}>
                            {isCreator ? text.creatorDashboard : text.becomeCreator}
                        </a>
                    </Link>
                {isLoggedIn ? 
                    profileMenu : 
                    <>
                        <button
                        onClick={() => uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' })}
                        className={`${classes.dialogToggler} ${classes.expandedLink}`}>
                            {text.signUp}
                        </button>
                        <button
                        onClick={() => uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' })}
                        className={`${classes.dialogToggler} ${classes.expandedLink}`}>
                            {text.logIn}
                        </button>
                    </>}
                </div>
            </nav>
        </AppBar>
    );
}

export default Navbar;