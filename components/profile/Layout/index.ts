import Layout from './Layout';

export type LayoutProps = {
    name: string;
    onPhotoChange?: (photo?: File) => void;
    photo?: string;
    city?: string;
}

export default Layout;