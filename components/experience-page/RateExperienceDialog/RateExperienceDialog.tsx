import React, { useState } from 'react';

import useLanguageContext from 'context/languageContext';
import type { RateExperienceDialogProps } from './index';

import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import Rating from '@material-ui/lab/Rating';
import CloseIcon from '@material-ui/icons/Close';
import TextField from 'components/TextField';

import { makeStyles } from '@material-ui/core/styles';
import styles from './RateExperienceDialog.styles';
const useStyles = makeStyles(styles);

const MAX_RATING_LENGTH = 300;

const RateExperienceDialog = (props: RateExperienceDialogProps) => {
    const { RateExperienceDialog: text } = useLanguageContext().appText;
    const classes = useStyles();

    const [ratingValue, setRatingValue] = useState<number>(5);
    const [review, setReview] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        props.onClose();
    }

    return (
        <Dialog 
        open={props.open}
        onClose={props.onClose}
        maxWidth="xs" 
        fullWidth 
        className={classes.dialog}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.header}>
                    <h3 className={classes.title}>{text.dialogTitle}</h3>
                    <CloseIcon className={classes.closeIcon} onClick={props.onClose} />
                </div>
                <div className={classes.ratingContainer}>
                    <Rating 
                    name="experience-rating"
                    value={ratingValue} 
                    onChange={(_, val) => {
                        if (val !== null) {
                            setRatingValue(val);
                        }
                    }}
                    className={classes.rating} />
                </div>
                <label htmlFor="review" className={classes.reviewLabel}>
                    {text.textfieldLabel}
                </label>
                <TextField
                id="review"
                multiline
                fullWidth
                minRows={6}
                maxRows={6}
                value={review}
                className={classes.reviewTextfield}
                onChange={e => {
                    const text = e.target.value;
                    if (text.length <= MAX_RATING_LENGTH) {
                        setReview(text);
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {MAX_RATING_LENGTH - review.length}
                        </InputAdornment>
                    )
                }} />
            </form>
            <button type="submit" className={classes.doneButton}>
                {text.doneButton}
            </button>
        </Dialog>
    );
}

export default RateExperienceDialog;