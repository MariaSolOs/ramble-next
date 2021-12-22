import React from 'react';
import { useRouter } from 'next/router';

import type { NavLinkProps } from './index';

import Link from 'next/link';

const NavLink: React.FC<NavLinkProps> = (props) => {
    const currentPage = useRouter().asPath;
    const LinkComponent = props.activeLinkComponent && currentPage == props.as ?
        props.activeLinkComponent : props.linkComponent;

    return (
        <Link href={props.href} as={props.as} passHref>
            <LinkComponent>
                {props.children}
            </LinkComponent>
        </Link>
    );
}

export default NavLink;