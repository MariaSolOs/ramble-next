import { useState, useEffect, useCallback } from 'react';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { NavbarProfileMenuProps } from './index';

import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import * as S from './NavbarProfileMenu.styled';

const NavbarProfileMenu = (props: NavbarProfileMenuProps) => {
    const { appText, toggleLanguage } = useLanguageContext();
    const { NavbarProfileMenu: text } = appText;
    const router = useRouter();
    const { asPath: currentPath } = router;
    const { onClose } = props;

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

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
            <S.Button isCreator={props.isCreator} onClick={e => setAnchorEl(e.currentTarget)}>
                <Avatar sx={{ height: { xs: 35, sm: 40 }, width: { xs: 35, sm: 40 } }}>
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
                <S.UserName isCreator={props.isCreator}>{props.userName}</S.UserName>
            </S.Button>
            <S.Menu
            isCreator={props.isCreator}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeMenu}
            transitionDuration={500}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}>
                <S.MenuItem className={currentPath === routes.userProfile.as ? 'active-link' : ''}>
                    <Link { ...routes.userProfile } passHref>
                        <a onClick={closeMenu}>{text.profile}</a>
                    </Link>
                </S.MenuItem>
                {props.isCreator &&
                    <S.MenuItem className={currentPath === routes.newExperience.as ? 'active-link' : ''}>
                        <Link { ...routes.newExperience } passHref>
                            <a onClick={closeMenu}>{text.newExperience}</a>
                        </Link>
                    </S.MenuItem>}
                <S.MenuItem 
                sx={{ ml: -1 }}
                onClick={() => {
                    toggleLanguage();
                    closeMenu();
                }}>
                    <S.LanguageIcon />
                    {text.languageItem}
                </S.MenuItem>
                <S.MenuItem
                onClick={() => {
                    closeMenu();
                    logout();
                }}>
                    {text.logout}
                </S.MenuItem>
            </S.Menu>
        </>
    );
}

export default NavbarProfileMenu;