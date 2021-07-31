import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Link from 'next/link';
import Image from 'next/image';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
                <Link href="/" passHref>
                    <a>
                        <Image 
                        src="/images/ramble-brand.png"
                        alt="Ramble"
                        width={150}
                        height={43}
                        className={classes.brand} />
                    </a>
                </Link>
                {props.children}
            </Toolbar>
        </MUIAppBar>
    );
}

export default AppBar;