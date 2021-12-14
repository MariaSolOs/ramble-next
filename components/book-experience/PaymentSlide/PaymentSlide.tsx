import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import type { InputBaseProps } from '@mui/material/InputBase';

import useLanguageContext from 'context/languageContext';
import { getTimePieces } from 'lib/date-time';
import type { PaymentSlideProps } from './index';

import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import * as S from './PaymentSlide.styled';

const ZIP_CODE_REGEX = /^[A-Za-z0-9 ]*$/;

const PaymentSlide = (props: PaymentSlideProps) => {
    const { appText, language } = useLanguageContext();
    const { BookExperience_PaymentSlide: text } = appText;

    const [startTime, setStartTime] = useState<string[]>([]);
    const [endTime, setEndTime] = useState<string[]>([]);
    const [isCardNumberReady, setIsCardNumberReady] = useState(false);
    const [isCardExpiryReady, setIsCardExpiryReady] = useState(false);
    const [isCardCvcReady, setIsCardCvcReady] = useState(false);
    const [isZipCodeValid, setIsZipCodeValid] = useState(true);

    // For formatting the timeslot nicely
    useEffect(() => {
        setStartTime(getTimePieces(props.selectedSlot.dateStart));
        setEndTime(getTimePieces(props.selectedSlot.dateEnd));
    }, [props.selectedSlot]);

    // Can submit when all fields are ready
    const { onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(
            isCardNumberReady && 
            isCardExpiryReady &&
            isCardCvcReady && 
            isZipCodeValid &&
            props.email.trim().length > 0
        );
    }, [isCardNumberReady, isCardExpiryReady, isCardCvcReady, 
        onSlideComplete, isZipCodeValid, props.email]);

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const zipCode = e.target.value;
        setIsZipCodeValid(ZIP_CODE_REGEX.test(zipCode));
        props.onZipCodeChange(zipCode);
    }

    const selectedDate = DateTime.fromISO(props.selectedDate).setLocale(language).toFormat('EEEE, MMMM d');
    
    return (
        <Box sx={{ width: 370, maxWidth: '100%', m: '0 auto' }}>
            <S.DateTitle>{selectedDate}</S.DateTitle>
            <S.TimeslotTitle>
                {`${startTime[0]} ${startTime[1]} - ${endTime[0]} ${endTime[1]}`}
            </S.TimeslotTitle>
            <S.Divisor />
            <Box m="1.5rem 0">
                <S.PriceRow>
                    <S.PriceWhiteText>{text.subtotal}</S.PriceWhiteText>
                    <S.PriceWhiteText>{props.fees.subTotalString}</S.PriceWhiteText>
                </S.PriceRow>
                <S.PriceRow>
                    <S.PriceGreyText>{text.serviceFee}</S.PriceGreyText>
                    <S.PriceGreyText>{props.fees.serviceFee.toFixed(2)}</S.PriceGreyText>
                </S.PriceRow>
                <S.PriceRow>
                    <S.PriceGreyText>TPS</S.PriceGreyText>
                    <S.PriceGreyText>{props.fees.taxGST.toFixed(2)}</S.PriceGreyText>
                </S.PriceRow>
                <S.PriceRow>
                    <S.PriceGreyText>TVQ</S.PriceGreyText>
                    <S.PriceGreyText>{props.fees.taxQST.toFixed(2)}</S.PriceGreyText>
                </S.PriceRow>
                <S.PriceRow>
                    <S.PriceWhiteText>{text.total} ({props.currency})</S.PriceWhiteText>
                    <S.PriceWhiteText>{props.fees.totalPrice.toFixed(2)}</S.PriceWhiteText>
                </S.PriceRow>
            </Box>
            <S.Input>
                <CardNumberElement 
                onChange={({ complete }) => setIsCardNumberReady(complete)}
                options={{
                    style: S.stripeStyles,
                    placeholder: text.cardNumberPlaceholder
                }} />
            </S.Input>
            <S.CardInfoRow>
                <S.Input>
                    <CardExpiryElement
                    onChange={({ complete }) => setIsCardExpiryReady(complete)}
                    options={{
                        style: S.stripeStyles,
                        placeholder: text.expiryDatePlaceholder
                    }} />
                </S.Input>
                <S.Input>
                    <CardCvcElement
                    onChange={({ complete }) => setIsCardCvcReady(complete)}
                    options={{
                        style: S.stripeStyles,
                        placeholder: text.cvcPlaceholder
                    }} />
                </S.Input>
                <S.Input
                component={InputBase}
                { ...{
                    required: true,
                    error: !isZipCodeValid,
                    value: props.zipCode,
                    onChange: handleZipCodeChange,
                    placeholder: text.zipCodePlaceholder
                } as InputBaseProps as any} />
            </S.CardInfoRow>
            <S.Input
            component={InputBase}
            { ...{
                required: true,
                type: 'email',
                value: props.email,
                onChange: e => props.onEmailChange(e.target.value),
                placeholder: text.emailPlaceholder
            } as InputBaseProps as any} />
            <S.EmailMessage>{text.emailMessage}</S.EmailMessage>
        </Box>
    );
}

export default PaymentSlide;