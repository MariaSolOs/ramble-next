import { useState, useEffect, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import { useLanguageContext } from 'context/languageContext';
import routes from 'routes';
import type { NavbarProfileMenuProps } from './index';

import Link from 'next/link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import LanguageIcon from '@material-ui/icons/Language';

import { makeStyles } from '@material-ui/core/styles';
import styles from './NavbarProfileMenu.styles';
const useStyles = makeStyles(styles);

const NavbarProfileMenu = (props: NavbarProfileMenuProps) => {
    const { appText, toggleLanguage } = useLanguageContext();
    const { NavbarProfileMenu: text } = appText;
    const classes = useStyles({ isCreator: props.isCreator });

    // const { asPath: currentPath } = useRouter();
    const router = useRouter();
    const { asPath: currentPath } = router;
    const client = useApolloClient();

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const { onClose } = props;
    const closeMenu = useCallback(() => { 
        // When closing, collapse both the parent menu and this menu
        setAnchorEl(null); 
        onClose();
    }, [onClose]);

    const logout = async () => {
        closeMenu();
        client.clearStore();
        const { url } = await signOut({ redirect: false });
        router.push(url);
    }

    // Close menu when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, [closeMenu]);

    return (
        <>
            <button onClick={e => setAnchorEl(e.currentTarget)} className={classes.button}>
                <Avatar src={props.userPhoto} alt="Profile picture" className={classes.avatar}>
                    {props.userName.charAt(0)}
                </Avatar>
                <span className={classes.userName}>{props.userName}</span>
            </button>
            <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            transitionDuration={500}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            className={classes.menu}>
                <MenuItem 
                className={`
                    ${classes.menuItem}
                    ${currentPath === routes.userProfile.as && classes.activeItem}
                `}>
                    <Link passHref { ...routes.userProfile }>
                        <a onClick={closeMenu} className={classes.itemContent}>
                            {text.profile}  
                        </a>
                    </Link>
                </MenuItem>
                {props.isCreator &&
                    <MenuItem 
                    className={`
                        ${classes.menuItem}
                        ${currentPath === routes.newExperience.as && classes.activeItem}
                    `}>
                        <Link passHref { ...routes.newExperience }>
                            <a onClick={closeMenu} className={classes.itemContent}>
                                {text.newExperience}
                            </a>
                        </Link>
                    </MenuItem>}
                <MenuItem className={classes.menuItem}>
                    <span 
                    onClick={toggleLanguage} 
                    className={`
                        ${classes.itemContent}
                        ${classes.languageChip}
                    `}>
                        <LanguageIcon className={classes.languageIcon} />
                        {text.languageChip}
                    </span>
                </MenuItem>
                <MenuItem 
                component="div"
                onClick={logout} 
                className={`${classes.menuItem} ${classes.itemContent}`}>
                    {text.logout}
                </MenuItem>
            </Menu>
        </>
    );
}

export default NavbarProfileMenu;