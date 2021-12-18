import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useLanguageContext from 'context/languageContext';
import { Currency } from 'graphql-server/sdk';
import type { PricingProps } from './index';

import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tip from 'components/Tip';
import * as S from './Pricing.styled';

const CURRENCIES = Object.values(Currency).filter(val => isNaN(+val));
const PRICE_REGEX = /^\d+$/;

const Pricing = (props: PricingProps) => {
    const { BuilderSlides_Pricing: text } = useLanguageContext().appText;

    const { onSlideComplete, pricePerPerson, privatePrice } = props;
    const [isPrivateEnabled, setIsPrivateEnabled] = useState(privatePrice > 0);

    useEffect(() => {
        /* Continue when the public price is defined, and if a private
           price was selected, make sure it is also valid. */ 
        onSlideComplete(
            pricePerPerson > 0 &&
            (!isPrivateEnabled || privatePrice > 0)
        );
    }, [onSlideComplete, pricePerPerson, privatePrice, isPrivateEnabled]);

    const handlePricePerPersonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Remove the dollar sign
        const price = event.target.value.slice(2);
        if (price === '' || PRICE_REGEX.test(price)) {
            props.onPricePerPersonChange(+price);
        }
    }

    const handlePrivatePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Remove the dollar sign
        const price = event.target.value.slice(2);
        if (price === '' || PRICE_REGEX.test(price)) {
            props.onPrivatePriceChange(+price);
        }
    }

    const projectedRevenue = (props.capacity * props.pricePerPerson) * 0.8;

    return (
        <>
            <S.Title>{text.title}</S.Title>
            <S.Subtitle>{text.subtitle1}</S.Subtitle>
            <Tip>{text.tip1}</Tip>
            <S.PriceRow>
                <S.FieldContainer>
                    <S.GreyText component="label">{text.pricePerPerson}</S.GreyText>
                    <S.TextField
                    required
                    value={`$ ${pricePerPerson}`}
                    onChange={handlePricePerPersonChange} />
                </S.FieldContainer>
                <S.FieldContainer>
                    <S.GreyText component="label">{text.currency}</S.GreyText>
                    <S.TextField
                    required
                    select
                    value={props.currency}
                    onChange={e => props.onCurrencyChange(e.target.value as Currency)}
                    SelectProps={{
                        MenuProps: {
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'center'
                            },
                            sx: S.selectStyles
                        },
                        IconComponent: KeyboardArrowDownIcon
                    }}>
                        {CURRENCIES.map(currency => 
                            <MenuItem key={uuid()} value={currency}>
                                $ {currency}
                            </MenuItem>
                        )}
                    </S.TextField>
                </S.FieldContainer>
                <S.Multiplication>
                    <S.GreyText component="p">
                        X {props.capacity} {text.creatorFee} =
                    </S.GreyText>
                </S.Multiplication>
                <S.FieldContainer>
                    <S.GreyText component="label">{text.revenue}</S.GreyText>
                    <S.TextField disabled value={`$ ${projectedRevenue.toFixed(2)}`} />
                </S.FieldContainer>
            </S.PriceRow>
            <S.PrivatePriceHeader>
                <S.Subtitle>{text.subtitle2}</S.Subtitle>
                <S.GreyText component="p">{text.privatePriceDescription}</S.GreyText>
                <S.Switch 
                size="small" 
                color="default" 
                onChange={(_, checked) => setIsPrivateEnabled(checked)} />
            </S.PrivatePriceHeader>
            {isPrivateEnabled &&
                <Box sx={{ mb: { xs: 0, sm: 10 } }}>
                    <Tip>{text.tip2}</Tip>
                    <Tip>{text.tip3}</Tip>
                    <S.FieldContainer>
                        <S.GreyText component="label">{text.privatePrice}</S.GreyText>
                        <S.TextField 
                        value={`$ ${privatePrice}`}
                        onChange={handlePrivatePriceChange} />
                    </S.FieldContainer>
                </Box>}
        </>
    );
}

export default Pricing;