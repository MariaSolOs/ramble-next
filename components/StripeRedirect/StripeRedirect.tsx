import { useState } from 'react';
import { useRouter } from 'next/router';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import type { StripeRedirectProps } from './index';

import Box from '@mui/material/Box';
import { faStripe } from '@fortawesome/free-brands-svg-icons/faStripe';
import Spinner from 'components/Spinner/Spinner';
import * as S from './StripeRedirect.styled';

const StripeRedirect = (props: StripeRedirectProps) => {
    const { StripeRedirect: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);

    const handleStripeRedirect = () => {
        setLoading(true);

        // Get Stripe link from the server
        fetch('/api/stripe/onboarding', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ creatorId: props.creatorId })
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error();
            }
        })
        .then(res => {
            // Redirect them to Stripe
            window.location.href = res.stripeRedirect;
        })
        .catch(() => {
            uiDispatch({
                type: 'OPEN_ERROR_DIALOG',
                message: "We couldn't complete your onboarding..."
            });
            router.replace('/');
        });
    }

    return (
        <S.Container>
            {loading && <Spinner />}
            <S.Message>{props.message1}</S.Message>
            <S.Message>{props.message2}</S.Message>
            <Box sx={{ mt: '2rem', cursor: 'pointer' }} onClick={handleStripeRedirect}>
                <Box component="p" m="0 0 -10px">{text.continueWithStripe}</Box>
                <S.StripeButton icon={faStripe} />
            </Box>
        </S.Container>
    );
}

export default StripeRedirect;