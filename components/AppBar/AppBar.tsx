import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import routes from 'routes';

import Link from 'next/link';
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
                <Link { ...routes.home } passHref>
                    <S.Brand>
                        <Image 
                        src={rambleLogo}
                        alt="Ramble"
                        width={150}
                        height={43}
                        priority />
                    </S.Brand>
                </Link>
            {props.children}
            </Toolbar>
        </S.AppBar>
    );  
}

export default AppBar;