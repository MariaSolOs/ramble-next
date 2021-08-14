import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { NavbarProfileMenuProps } from './index';

import Link from 'next/link';
import Image from 'next/image';
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
    const router = useRouter();
    const { asPath: currentPath } = router;
    const classes = useStyles({ isCreator: props.isCreator });

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const { onClose } = props;
    const closeMenu = useCallback(() => { 
        // When closing, collapse both the parent menu and this menu
        setAnchorEl(null); 
        onClose();
    }, [onClose]);

    const logout = async () => {
        const signOutData = await signOut({ redirect: false, callbackUrl: '/' });
        router.push(signOutData.url);
    }

    // Close menu when window resizes
    useEffect(() => {
        window.addEventListener('resize', closeMenu);

        return () => { window.removeEventListener('resize', closeMenu); }
    }, [closeMenu]);

    return (
        <>
            <button onClick={e => setAnchorEl(e.currentTarget)} className={classes.button}>
                <Avatar className={classes.avatar}>
                    {props.userPhoto?.src ? 
                        <Image
                        src={props.userPhoto.src}
                        alt={props.userName}
                        width={40}
                        height={40}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={props.userPhoto.placeholder} /> :
                        props.userName.charAt(0)}
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
                onClick={() => {
                    closeMenu();
                    logout();
                }} 
                className={`${classes.menuItem} ${classes.itemContent}`}>
                    {text.logout}
                </MenuItem>
            </Menu>
        </>
    );
}

export default NavbarProfileMenu;