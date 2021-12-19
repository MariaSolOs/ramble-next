import Layout from './Layout';

export type LayoutProps = {
    name: string;
    onPhotoChange?: (photo?: File) => void;
    photo?: string;
    city?: string;
}

export type NavLinkProps = {
    href: string;
    as: string;
}

export default Layout;