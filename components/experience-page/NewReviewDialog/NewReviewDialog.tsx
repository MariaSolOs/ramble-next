import React, { useState } from 'react';

import { getGraphQLClient } from 'lib/graphql';
import { getSdk } from 'graphql-server/sdk';
import useLanguageContext from 'context/languageContext';
import type { NewReviewDialogProps } from './index';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import InputAdornment from '@mui/material/InputAdornment';
import Spinner from 'components/Spinner';
import * as S from './NewReviewDialog.styled';

const MAX_RATING_LENGTH = 300;

const graphQLClient = getGraphQLClient();
const sdk = getSdk(graphQLClient);

const NewReviewDialog = (props: NewReviewDialogProps) => {
    const { RateExperienceDialog: text } = useLanguageContext().appText;

    const [ratingValue, setRatingValue] = useState<number>(5);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        // Submit rating
        await sdk.createReview({
            experienceId: props.experienceId,
            value: ratingValue,
            text: review
        });

        setLoading(false);
        
        props.onClose();
    }

    return (
        <S.Dialog
        open={props.open}
        onClose={props.onClose}
        maxWidth="xs" 
        fullWidth>
            {loading && <Spinner />}
            <Box 
            component="form" 
            sx={{ display: 'flex', flexDirection: 'column' }} 
            onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <S.Title>{text.dialogTitle}</S.Title>
                    <S.CloseIcon onClick={props.onClose} />
                </Box>
                <Box m="2rem auto">
                    <Rating
                    name="experience-rating"
                    value={ratingValue} 
                    onChange={(_, val) => {
                        if (val !== null) {
                            setRatingValue(val);
                        }
                    }}
                    sx={{ color: '#FFF', '& .MuiRating-iconEmpty': { stroke: '#FFF' } }} />
                </Box>
                <Box 
                component="label" 
                htmlFor="review"
                sx={{ mb: '10px', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                    {text.textfieldLabel}
                </Box>
                <S.ReviewTextField
                id="review"
                multiline
                fullWidth
                minRows={6}
                maxRows={6}
                value={review}
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
                <S.DoneButton disabled={review.length === 0} type="submit">
                    {text.doneButton}
                </S.DoneButton>
            </Box>
        </S.Dialog>
    );
}

export default NewReviewDialog;