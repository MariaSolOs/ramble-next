import type React from 'react';

import NavLink from './NavLink';

export type NavLinkProps = {
    href: string; 
    as: string;
    linkComponent: React.ElementType;
    activeLinkComponent?: React.ElementType;
}

export default NavLink;