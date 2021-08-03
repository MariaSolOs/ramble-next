import React, { useState } from 'react';

import useLanguageContext from 'context/languageContext';

import Chip from '@material-ui/core/Chip';
import LanguageIcon from '@material-ui/icons/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import CustomerServiceDialog from 'components/CustomerServiceDialog';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Footer.styles';
const useStyles = makeStyles(styles);

const Footer = () => {
    const { appText, toggleLanguage, language } = useLanguageContext();
    const { Footer: text } = appText;
    const classes = useStyles();

    const [showCustomerServiceDialog, setShowCustomerServiceDialog] = useState(false);

    return (
        <>
            <CustomerServiceDialog 
            open={showCustomerServiceDialog}
            onClose={() => setShowCustomerServiceDialog(false)} />
            <footer className={classes.footer}>
                <h4 className={classes.title}>ramble</h4>
                <div className={classes.body}>
                    <div className={classes.bodyColumn}>
                        <h5 className={classes.columnTitle}>{text.supportColumnName}</h5>
                        <p 
                        className={`${classes.greyText} ${classes.supportLink}`}
                        onClick={() => setShowCustomerServiceDialog(true)}>
                            {text.supportLink}
                        </p>
                    </div>
                    <div className={classes.bodyColumn}>
                        <h5 className={classes.columnTitle}>{text.socialColumnName}</h5>
                        <a 
                        href="https://www.instagram.com/experienceramble/"
                        rel="noopener noreferrer" 
                        target="_blank">
                            <FontAwesomeIcon 
                            icon={faInstagram} 
                            className={`${classes.mediaIcon} ${classes.instagramIcon}`} />
                        </a>
                        <a 
                        href="https://www.facebook.com/experienceramble"
                        rel="noopener noreferrer" 
                        target="_blank">
                            <FontAwesomeIcon 
                            icon={faFacebook} 
                            className={`${classes.mediaIcon} ${classes.facebookIcon}`} />
                        </a>
                    </div>
                    <div className={classes.bodyColumn}>
                        <h5 className={classes.columnTitle}>{text.languageColumnName}</h5>
                        <Chip
                        icon={<LanguageIcon />}
                        label={text.languageChip}
                        className={classes.languageChip}
                        clickable
                        onClick={toggleLanguage} />
                    </div>
                </div>
                <p className={classes.greyText}>&copy; {text.copyright}</p>
            </footer>
        </>
    );
}

export default React.memo(Footer);