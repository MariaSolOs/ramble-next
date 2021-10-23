import useLanguageContext from 'context/languageContext';
import type { CustomerServiceDialogProps } from './index';

import DialogContent from '@mui/material/DialogContent';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import * as S from './CustomerServiceDialog.styled';

const PHONE_NUMBER = '+ 1 (514) 654-7156';
const EMAIL = 'phil.ramble@outlook.com';

/* This dialog is not controlled with the UI context, since it can be opened
 * only from the footer and no other dialog can be displayed 
 * at the same time. */
const CustomerServiceDialog = (props: CustomerServiceDialogProps) => {
    const { CustomerServiceDialog: text } = useLanguageContext().appText;

    return (
        <S.Dialog open={props.open} onClose={props.onClose}>
            <S.Title>{text.title}</S.Title>
            <S.GreyText>{text.message}</S.GreyText>
            <DialogContent sx={{ p: '8px 8px 0' }}>
                <S.ContactInfo>
                    <S.Icon icon={faPhoneAlt} />
                    <S.GreyText>{PHONE_NUMBER}</S.GreyText>
                </S.ContactInfo>
                <S.ContactInfo>
                    <S.Icon icon={faEnvelope} />
                    <S.GreyText>{EMAIL}</S.GreyText>
                </S.ContactInfo>
            </DialogContent>
        </S.Dialog>
    );
}

export default CustomerServiceDialog;