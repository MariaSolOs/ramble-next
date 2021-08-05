import NavbarProfileMenu from './NavbarProfileMenu';
import type { Image } from 'models/files';

export type NavbarProfileMenuProps = {
    userName: string;
    userPhoto?: Image;
    isCreator: boolean;
    onClose: () => void;
}

export type NavbarProfileMenuStyleProps = {
    isCreator: boolean;
}

export default NavbarProfileMenu;