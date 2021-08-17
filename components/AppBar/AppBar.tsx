import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import routes from 'routes';

import NavLink from 'components/NavLink';
import Image from 'next/image';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import rambleLogo from 'public/images/ramble-brand.png';

import { makeStyles } from '@material-ui/core/styles';
import styles from './AppBar.styles';
const useStyles = makeStyles(styles);

const AppBar: React.FC = (props) => {
    const classes = useStyles();

    // Fade out navbar when scrolling
    const isScrolled = useScrollTrigger({ 
        disableHysteresis: true,
        threshold: 50
    });

    return (
        <MUIAppBar 
        position="fixed"
        className={`${classes.root} ${isScrolled && classes.scrolled}`}>
            <Toolbar>
                <NavLink link={routes.home} className={classes.brand}>
                    <Image 
                    src={rambleLogo}
                    alt="Ramble"
                    width={150}
                    height={43}
                    priority />
                </NavLink>
                {props.children}
            </Toolbar>
        </MUIAppBar>
    );
}

export default AppBar;