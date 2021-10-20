import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import useUserContext from 'context/userContext';

import Link from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import AppBar from 'components/AppBar';
import NavbarProfileMenu from 'components/NavbarProfileMenu';
import * as S from './Navbar.styled';

const Navbar = () => {
    const { appText, toggleLanguage } = useLanguageContext();
    const { Navbar: text } = appText;
    const { uiDispatch } = useUiContext();
    const { 
        isLoggedIn,
        isCreator,
        userName,
        userPhoto
    } = useUserContext().userUi;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const closeMenu = () => { setAnchorEl(null); }
    
    // Close menu when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, []);

    const profileMenu = (
        <NavbarProfileMenu
        userName={userName || ''}
        userPhoto={userPhoto}
        onClose={closeMenu}
        isCreator={isCreator} />
    );

    const expandedNav = (
        <S.ExpandedNav>
            {!isLoggedIn && 
                <S.LanguageChip
                icon={<LanguageIcon />}
                label={text.languageChip}
                clickable
                onClick={toggleLanguage} />}
            <Link
            passHref
            href={isCreator ?
                routes.bookingRequests.href : 
                routes.becomeACreator.href
            }>
                <S.ExpandedLink component="a" sx={{ color: '#FFF' }}>
                    {isCreator ? text.creatorDashboard : text.becomeCreator}
                </S.ExpandedLink>
            </Link>
            {isLoggedIn ?
                profileMenu :
                <>
                    <S.ExpandedLink 
                    component="button" 
                    onClick={() => uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' })}>
                        {text.signUp}
                    </S.ExpandedLink>
                    <S.ExpandedLink 
                    component="button" 
                    onClick={() => uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' })}>
                        {text.logIn}
                    </S.ExpandedLink>
                </>}
        </S.ExpandedNav>
    );

    const collapsedNav = (
        <>
            <IconButton disableRipple onClick={e => setAnchorEl(e.currentTarget)}>
                <S.ToggleIcon icon={faAngleDoubleDown} />
            </IconButton>
            <S.Menu
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            anchorEl={anchorEl}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                {!isLoggedIn &&
                    <S.MenuItem 
                    sx={{ ml: -1 }}
                    onClick={() => { 
                        toggleLanguage(); 
                        closeMenu();
                    }}>
                        <S.LanguageIcon />
                        {text.languageItem}
                    </S.MenuItem>}
                <S.MenuItem>
                    <Link
                    passHref
                    href={isCreator ?
                        routes.bookingRequests.href : 
                        routes.becomeACreator.href
                    }>
                        <a onClick={closeMenu}>
                            {isCreator ? text.creatorDashboard : text.becomeCreator}
                        </a>
                    </Link>
                </S.MenuItem>
                {isLoggedIn ? 
                    <S.MenuItem noHoverTransition sx={{ height: { xs: 40, sm: 45 } }}>
                        {profileMenu}
                    </S.MenuItem> :
                    [
                        <S.MenuItem
                        key={uuid()}
                        onClick={() => {
                            uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' });
                            closeMenu();
                        }}>
                            {text.signUp}
                        </S.MenuItem>,
                        <S.MenuItem
                        key={uuid()}
                        onClick={() => {
                            uiDispatch({ type: 'OPEN_LOG_IN_DIALOG' });
                            closeMenu();
                        }}>
                            {text.logIn}
                        </S.MenuItem>
                    ]}
            </S.Menu>
        </>
    );

    return (
        <AppBar>
            <Box component="nav" sx={{ position: 'absolute', right: 0 }}>
                {isMobile ? collapsedNav : expandedNav}
            </Box>
        </AppBar>
    );
}

export default Navbar;