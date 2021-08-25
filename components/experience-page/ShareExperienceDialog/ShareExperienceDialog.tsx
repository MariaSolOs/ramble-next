import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import useLanguageContext from 'context/languageContext';
import type { ShareExperienceDialogProps } from './index';

import Image from 'next/image';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import {
    FacebookMessengerShareButton, 
    FacebookShareButton,
    EmailShareButton, 
    LinkedinShareButton
} from 'react-share';
import messengerIcon from 'public/images/messenger-icon.svg';
import facebookIcon from 'public/images/facebook-icon.svg';
import emailIcon from 'public/images/email-icon.svg';
import linkedinIcon from 'public/images/linkedin-icon.svg';

import { makeStyles } from '@material-ui/core/styles';
import styles from './ShareExperienceDialog.styles';
const useStyles = makeStyles(styles);

const ShareExperienceDialog = (props: ShareExperienceDialogProps) => {
    const { ShareExperienceDialog: text } = useLanguageContext().appText;
    const classes = useStyles();

    const [openTooltip, setOpenTooltip] = useState(false);
    const handleOpenTooltip = () => {
        setOpenTooltip(true);
        // Hide the tooltip message after 3 seconds
        setTimeout(() => handleCloseTooltip(), 3000);
    }
    const handleCloseTooltip = () => setOpenTooltip(false);

    return (
        <Dialog 
        open={props.open} 
        onClose={props.onClose} 
        maxWidth="xs"
        className={classes.dialog}>
            <div className={classes.header}>
                <h4 className={classes.title}>{text.shareExperience}</h4>
                <CloseIcon className={classes.closeIcon} onClick={props.onClose} />
            </div>
            <DialogContent className={classes.content}>
                <FacebookMessengerShareButton
                url={props.shareUrl}
                resetButtonStyle={false}
                className={classes.button}
                appId={process.env.NEXT_PUBLIC_FACEBOOK_ID!}>
                    <div className={classes.mediaIcon}>
                        <Image
                        src={messengerIcon}
                        alt="Share with Messenger"
                        width={27}
                        height={27} />
                    </div>
                    Messenger
                </FacebookMessengerShareButton>
                <EmailShareButton 
                url={props.shareUrl}
                resetButtonStyle={false}
                className={classes.button}
                subject={`Ramble: ${props.experienceTitle}`}
                body="Checkout this experience: ">
                    <div className={classes.mediaIcon}>
                        <Image
                        src={emailIcon}
                        alt="Share with email"
                        layout="fixed"
                        width={27}
                        height={27} />
                    </div>
                    Email
                </EmailShareButton>
                <FacebookShareButton
                url={props.shareUrl}
                resetButtonStyle={false}
                className={classes.button}>
                    <div className={classes.mediaIcon}>
                        <Image
                        src={facebookIcon}
                        alt="Share with Facebook"
                        layout="fixed"
                        width={27}
                        height={27} />
                    </div>
                    Facebook
                </FacebookShareButton>
                <LinkedinShareButton
                url={props.shareUrl}
                resetButtonStyle={false}
                className={classes.button}>
                    <div className={classes.mediaIcon}>
                        <Image
                        src={linkedinIcon}
                        alt="Share with LinkedIn"
                        layout="fixed"
                        width={27}
                        height={27} />
                    </div>
                    LinkedIn
                </LinkedinShareButton>
                <CopyToClipboard text={props.shareUrl}>
                    <div className={`${classes.button} ${classes.shareButton}`}>
                        <span className={classes.shareLink}>{props.shareUrl}</span>...
                        <ClickAwayListener onClickAway={handleCloseTooltip}>
                            <Tooltip 
                            PopperProps={{ disablePortal: true }}
                            open={openTooltip}
                            onClose={handleCloseTooltip}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title={text.copyTooltip}
                            placement="top-end">
                                <button 
                                onClick={handleOpenTooltip} 
                                className={classes.copyButton}>
                                    {text.copyLink}
                                </button>
                            </Tooltip>
                        </ClickAwayListener>
                    </div>
                </CopyToClipboard> 
            </DialogContent>
        </Dialog>
    );
}

export default ShareExperienceDialog;