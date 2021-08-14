import { useEffect } from 'react';

import useLanguageContext from 'context/languageContext';
import type { TitleProps } from './index';

import SlideTitle from 'components/experience-builder/SlideTitle';
import Subtitle from 'components/experience-builder/SlideSubtitle';
import Tip from 'components/Tip';
import TextField from 'components/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Title.styles';
const useStyles = makeStyles(styles);

const MAX_LENGTH = 50;

const Title = (props: TitleProps) => {
    const { BuilderSlides_Title: text } = useLanguageContext().appText;
    const classes = useStyles();

    const { title, onSlideComplete } = props;
    useEffect(() => {
        const length = title.trim().length;
        onSlideComplete(length > 0 && length <= MAX_LENGTH);
    }, [title, onSlideComplete]);

    return (
        <>
            <SlideTitle>{text.title}</SlideTitle>
            <Subtitle className={classes.subtitle}>{text.subtitle}</Subtitle>
            <Tip className={classes.tip}>{text.tip}</Tip>
            <TextField
            value={title}
            required
            fullWidth
            onChange={e => {
                const value = e.target.value;
                if (value.length <= MAX_LENGTH) {
                    props.onTitleChange(value);
                }
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {MAX_LENGTH - title.length}
                    </InputAdornment>
                )
            }} />
        </>
    );
}

export default Title;