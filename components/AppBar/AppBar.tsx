import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import routes from 'routes';

import NavLink from 'components/NavLink';
import Image from 'next/image';
import Toolbar from '@mui/material/Toolbar';
import rambleLogo from 'public/images/ramble-brand.png';
import * as S from './AppBar.styled';

const AppBar: React.FC = (props) => {
    // Fade out navbar when scrolling
    const isScrolled = useScrollTrigger({ 
        disableHysteresis: true,
        threshold: 50
    });

    return (
        <S.AppBar position="fixed" isScrolled={isScrolled}>
            <Toolbar>
                <NavLink { ...routes.home } linkComponent={S.Brand}>
                    <Image 
                    src={rambleLogo}
                    alt="Ramble"
                    width={150}
                    height={43}
                    priority />
                </NavLink>
            {props.children}
            </Toolbar>
        </S.AppBar>
    );  
}

export default AppBar;