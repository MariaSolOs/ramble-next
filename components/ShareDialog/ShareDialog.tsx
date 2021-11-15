import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import useLanguageContext from 'context/languageContext';
import type { ShareDialogProps } from './index';

import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
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
import * as S from './ShareDialog.styled';

const ShareDialog = (props: ShareDialogProps) => {
    const { ShareDialog: text } = useLanguageContext().appText;

    const [openTooltip, setOpenTooltip] = useState(false);
    const handleOpenTooltip = () => {
        setOpenTooltip(true);
        // Hide the tooltip message after 3 seconds
        setTimeout(() => handleCloseTooltip(), 3000);
    }
    const handleCloseTooltip = () => setOpenTooltip(false);

    return (
        <S.Dialog maxWidth="xs" open={props.open} onClose={props.onClose}>
            <S.Header>
                <S.Title>{props.dialogTitle}</S.Title>
                <CloseIcon sx={{ cursor: 'pointer', color: '#CCC' }} onClick={props.onClose} />
            </S.Header>
            <S.Content>
                <S.Button 
                component={FacebookMessengerShareButton}
                { ...{
                    url: props.shareUrl,
                    resetButtonStyle: false,
                    appId: process.env.NEXT_PUBLIC_FACEBOOK_ID!
                } as React.ComponentProps<typeof FacebookMessengerShareButton> as any}>
                    <S.MediaIcon>
                        <Image
                        src={messengerIcon}
                        alt="Share with Messenger"
                        width={27}
                        height={27} />
                    </S.MediaIcon>
                    Messenger
                </S.Button>
                <S.Button 
                component={EmailShareButton}
                { ...{
                    url: props.shareUrl,
                    resetButtonStyle: false,
                    subject: 'Checkout this at Ramble!',
                    body: 'Checkout this at Ramble: '
                } as React.ComponentProps<typeof EmailShareButton> as any}>
                    <S.MediaIcon>
                        <Image
                        src={emailIcon}
                        alt="Share with email"
                        layout="fixed"
                        width={27}
                        height={27} />
                    </S.MediaIcon>
                    Email
                </S.Button>
                <S.Button 
                component={FacebookShareButton}
                { ...{
                    url: props.shareUrl,
                    resetButtonStyle: false
                } as React.ComponentProps<typeof FacebookShareButton> as any}>
                    <S.MediaIcon>
                        <Image
                        src={facebookIcon}
                        alt="Share with Facebook"
                        layout="fixed"
                        width={27}
                        height={27} />
                    </S.MediaIcon>
                    Facebook
                </S.Button>
                <S.Button 
                component={LinkedinShareButton}
                { ...{
                    url: props.shareUrl,
                    resetButtonStyle: false
                } as React.ComponentProps<typeof LinkedinShareButton> as any}>
                    <S.MediaIcon>
                        <Image
                        src={linkedinIcon}
                        alt="Share with LinkedIn"
                        layout="fixed"
                        width={27}
                        height={27} />
                    </S.MediaIcon>
                    LinkedIn
                </S.Button>
                <CopyToClipboard text={props.shareUrl}>
                    <S.Button sx={{ width: '100%', cursor: 'default', p: '0 7px' }}>
                        <S.ShareLink>{props.shareUrl}</S.ShareLink>...
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
                                <S.CopyButton onClick={handleOpenTooltip}>
                                    {text.copyLink}
                                </S.CopyButton>
                            </Tooltip>
                        </ClickAwayListener>
                    </S.Button>
                </CopyToClipboard>
            </S.Content>
        </S.Dialog>
    );
}

export default ShareDialog;