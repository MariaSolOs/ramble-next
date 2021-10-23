import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import type { CustomerServiceDialogProps } from 'components/CustomerServiceDialog';

import Box from '@mui/material/Box';
import Link from 'next/link';
import LanguageIcon from '@mui/icons-material/Language';

import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import * as S from './Footer.styled';

const CustomerServiceDialog = dynamic<CustomerServiceDialogProps>(() => 
    import('components/CustomerServiceDialog')
);

const INSTAGRAM_LINK = 'https://www.instagram.com/experienceramble/';
const FACEBOOK_LINK = 'https://www.facebook.com/experienceramble';

const Footer = () => {
    const { appText, toggleLanguage } = useLanguageContext();
    const { Footer: text } = appText;

    const [showCustomerServiceDialog, setShowCustomerServiceDialog] = useState(false);

    return (
        <>
            {showCustomerServiceDialog && 
                <CustomerServiceDialog 
                open={showCustomerServiceDialog}
                onClose={() => setShowCustomerServiceDialog(false)} />}
            <S.Footer>
                <S.Title>ramble</S.Title>
                <Box sx={{ display: 'flex', m: '0 auto 0 0' }}>
                    <S.BodyColumn>
                        <S.ColumnTitle>{text.supportColumnName}</S.ColumnTitle>
                        <S.SupportLink onClick={() => setShowCustomerServiceDialog(true)}>
                            {text.supportLink}
                        </S.SupportLink>
                    </S.BodyColumn>
                    <S.BodyColumn>
                        <S.ColumnTitle>{text.socialColumnName}</S.ColumnTitle>
                        <a
                        href={INSTAGRAM_LINK}
                        rel="noopener noreferrer" 
                        target="_blank">
                            <S.MediaIcon media="instagram" icon={faInstagram} />
                        </a>
                        <a
                        href={FACEBOOK_LINK}
                        rel="noopener noreferrer" 
                        target="_blank">
                            <S.MediaIcon media="facebook" icon={faFacebook} />
                        </a>
                    </S.BodyColumn>
                    <S.BodyColumn>
                        <S.ColumnTitle>{text.communityColumnName}</S.ColumnTitle>
                        <Link { ...routes.blog } passHref>
                            <S.GreyText as="a">{text.blogLink}</S.GreyText>
                        </Link>
                    </S.BodyColumn>
                    <S.BodyColumn>
                        <S.ColumnTitle>{text.languageColumnName}</S.ColumnTitle>
                        <S.LanguageChip
                        clickable
                        icon={<LanguageIcon />}
                        label={text.languageChip}
                        onClick={toggleLanguage} />
                    </S.BodyColumn>
                </Box>
                <S.GreyText as="p">2021 &copy; {text.copyright}</S.GreyText>
            </S.Footer>
        </>
    );
}

export default React.memo(Footer); 