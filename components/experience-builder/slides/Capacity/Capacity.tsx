import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { CapacityProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import Tip from 'components/Tip';
import PlusMinusInput from 'components/PlusMinusInput';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Capacity.styles';
const useStyles = makeStyles(styles);

const Capacity = (props: CapacityProps) => {
    const { BuilderSlides_Capacity: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { capacity, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(capacity >= 1);
    }, [capacity, onSlideComplete]);

    return (
        <>
            <Title>{text.title}</Title>
            <Subtitle>{text.subtitle}</Subtitle>
            <Tip className={classes.tip}>{text.tip}</Tip>
            <PlusMinusInput
            value={capacity}
            minValue={1}
            step={1}
            onValueChange={props.onCapacityChange}
            containerClass={classes.capacityField}
            getLabel={val => val > 1 ? text.people : text.person} />
        </>
    );
}

export default Capacity;