import type { Image } from 'models/files';

import NavbarProfileMenu from './NavbarProfileMenu';

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