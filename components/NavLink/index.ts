import type React from 'react';

import NavLink from './NavLink';

export type NavLinkProps = {
    link: { href: string; as: string; };
    className: string;
    activeClassName?: string;
    linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export default NavLink;