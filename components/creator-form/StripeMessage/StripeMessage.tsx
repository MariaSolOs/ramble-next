import { useState } from 'react';

import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import type { StripeMessageProps } from './index';

import Spinner from 'components/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStripe } from '@fortawesome/free-brands-svg-icons/faStripe';

import { makeStyles } from '@material-ui/core/styles';
import styles from './StripeMessage.styles';
const useStyles = makeStyles(styles);

const StripeMessage = (props: StripeMessageProps) => {
    const { CreatorForm: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const classes = useStyles();

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
        .then(res => res.json())
        .then(res => {
            // Redirect them to Stripe
            window.location.href = res.stripeRedirect;
        })
        .catch(() => {
            uiDispatch({ 
                type: 'OPEN_ERROR_DIALOG', 
                message: "We couldn't complete your onboarding..."
            });
        });
    }

    return (
        <div className={classes.root}>
            {loading && <Spinner />}
            <p className={classes.submittedMessage}>{text.formSubmittedMessage}</p>
            <p className={classes.stripeMessage}>{text.stripeMessage}&trade;</p>
            <div className={classes.stripeLinkContainer} onClick={handleStripeRedirect}>
                <p className={classes.stripeContinue}>{text.continueWithStripe}</p>
                <FontAwesomeIcon icon={faStripe} className={classes.stripeButton} />
            </div>
        </div>
    );
}

export default StripeMessage;