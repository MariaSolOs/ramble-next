import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { PlanningProps } from './index';

import Title from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import TextField from 'components/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Planning.styles';
const useStyles = makeStyles(styles);

const MAX_PLANNING_LENGTH = 1000;

const Planning = (props: PlanningProps) => {
    const { BuilderSlides_Planning: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { planning, onSlideComplete } = props;
    useEffect(() => {
        onSlideComplete(planning.trim().length > 0);
    }, [planning, onSlideComplete]);

    return (
        <div className={classes.root}>
            <Title>{text.title}</Title>
            <Subtitle className={classes.subtitle}>{text.subtitle}</Subtitle>
            <TextField
            fullWidth
            multiline
            rows={4}
            className={classes.textField}
            label={text.textfieldLabel}
            value={planning}
            onChange={e => props.onPlanningChange(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">    
                        {MAX_PLANNING_LENGTH - planning.length}
                    </InputAdornment>
                )
            }} />
        </div>
    );
}

export default Planning;