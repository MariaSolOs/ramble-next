import NavbarProfileMenu from './NavbarProfileMenu';

export type NavbarProfileMenuProps = {
    userName: string;
    userPhoto: string;
    isCreator: boolean;
    onClose: () => void;
}

export type NavbarProfileMenuStyleProps = {
    isCreator: boolean;
}

export default NavbarProfileMenu;