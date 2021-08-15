import React from 'react';
import { useRouter } from 'next/router';

import type { NavLinkProps } from './index';

import Link from 'next/link';

const NavLink: React.FC<NavLinkProps> = (props) => {
    const currentPage = useRouter().asPath;

    return (
        <Link href={props.link.href} as={props.link.as} passHref>
            <a 
            { ...props.linkProps }
            className={`
                ${props.className} 
                ${currentPage === props.link.as && props.activeClassName}
            `}>
                {props.children}
            </a>
        </Link>
    );
}

export default NavLink;