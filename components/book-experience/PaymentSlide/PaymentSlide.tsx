import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import useLanguageContext from 'context/languageContext';
import { getTimePieces } from 'lib/date-time';
import type { PaymentSlideProps } from './index';

import InputBase from '@material-ui/core/InputBase';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import { makeStyles } from '@material-ui/core/styles';
import styles, { stripeStyles } from './PaymentSlide.styles';
const useStyles = makeStyles(styles);

const ZIP_CODE_REGEX = /^[A-Za-z0-9 ]*$/;

const PaymentSlide = (props: PaymentSlideProps) => {
    const { appText, language } = useLanguageContext();
    const { BookExperience_PaymentSlide: text } = appText;
    const classes = useStyles();

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
        <div className={classes.root}>
            <time className={classes.dateTitle}>{selectedDate}</time>
            <time className={classes.timeslotTitle}>
                {`${startTime[0]} ${startTime[1]} - ${endTime[0]} ${endTime[1]}`}
            </time>
            <div className={classes.divisor} />
            <div className={classes.priceBreakdown}>
                <div className={classes.priceRow}>
                    <p className={classes.priceWhiteText}>{text.subtotal}</p>
                    <p className={classes.priceWhiteText}>
                        {props.fees.subTotalString}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>{text.serviceFee}</p>
                    <p className={classes.priceGreyText}>
                        {props.fees.serviceFee.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>TPS</p>
                    <p className={classes.priceGreyText}>
                        {props.fees.taxGST.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceGreyText}>TVQ</p>
                    <p className={classes.priceGreyText}>
                        {props.fees.taxQST.toFixed(2)}
                    </p>
                </div>
                <div className={classes.priceRow}>
                    <p className={classes.priceWhiteText}>
                        {text.total} ({props.currency})
                    </p>
                    <p className={classes.priceWhiteText}>
                        {props.fees.totalPrice.toFixed(2)}
                    </p>
                </div>
            </div>
            <CardNumberElement 
            onChange={({ complete }) => setIsCardNumberReady(complete)}
            className={classes.input} 
            options={{
                style: stripeStyles,
                placeholder: text.cardNumberPlaceholder
            }} />
            <div className={classes.cardInfoRow}>
                <CardExpiryElement
                onChange={({ complete }) => setIsCardExpiryReady(complete)}
                className={classes.input}
                options={{
                    style: stripeStyles,
                    placeholder: text.expiryDatePlaceholder
                }} />
                <CardCvcElement
                onChange={({ complete }) => setIsCardCvcReady(complete)}
                className={classes.input}
                options={{
                    style: stripeStyles,
                    placeholder: text.cvcPlaceholder
                }} />
                <InputBase
                required
                error={!isZipCodeValid}
                value={props.zipCode}
                onChange={handleZipCodeChange}
                className={classes.input}
                placeholder={text.zipCodePlaceholder} />
            </div>
            <InputBase
            required
            type="email"
            value={props.email}
            onChange={e => props.onEmailChange(e.target.value)}
            className={classes.input}
            placeholder={text.emailPlaceholder} />
            <p className={classes.emailMessage}>{text.emailMessage}</p>
        </div>
    );
}

export default PaymentSlide;