import { useSession } from 'next-auth/client';

import routes from 'routes';
import useLanguageContext from 'context/languageContext';
import useUiContext from 'context/uiContext';
import type { LandingProps } from './index';

import Image from 'next/image';
import GradientButton from 'components/GradientButton';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Landing.styles';
const useStyles = makeStyles(styles);

const Landing = (props: LandingProps) => {
    const { BecomeACreator: text } = useLanguageContext().appText;
    const { uiDispatch } = useUiContext();
    const [session] = useSession();
    const classes = useStyles();

    const isLoggedIn = Boolean(session?.user.userId);
    const isCreator = Boolean(session?.user.creatorId);
    const linkProps = isCreator ? routes.newExperience : routes.creatorForm;

    return (
        <div className={classes.slide}>
            <div>
                <h1 className={classes.title}>{text.becomeTitle}</h1>
                <h1 className={classes.title}>{text.shareTitle}</h1>
                <h1 className={classes.title}>{text.getPaidTitle}</h1>
                <GradientButton
                variant="creator"
                className={classes.button}
                {...isLoggedIn ? linkProps : {
                    onClick: () => uiDispatch({ type: 'OPEN_SIGN_UP_DIALOG' })
                }}>
                    {text.getStarted}
                </GradientButton>
            </div>
            <div className={classes.img}>
                <Image
                src={props.image.src}
                width={500}
                height={600}
                objectFit="cover"
                alt="Cooking with Sidney"
                placeholder="blur"
                blurDataURL={props.image.placeholder} />
            </div>
        </div>
    );
}

export default Landing;