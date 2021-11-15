import useLanguageContext from 'context/languageContext';
import type { AllReviewsDialogProps } from './index';

import Box from '@mui/material/Box';
import * as S from './AllReviewsDialog.styled';

const AllReviewsDialog = (props: AllReviewsDialogProps) => {
    const { AllReviewsDialog: text } = useLanguageContext().appText;

    return (
        <S.Dialog
        open={props.open} 
        onClose={props.onClose}
        maxWidth="sm"
        fullWidth>
            <S.Header>
                <S.Title>{text.title}</S.Title>
                <S.CloseIcon onClick={props.onClose} />
            </S.Header>
            <Box component="ul" sx={{ p: 0, mb: 0, listStyle: 'none' }}>
                {props.reviews.map(review => 
                    <li key={review._id}>
                        <S.ReviewTitle>
                            {review.writtenBy}
                            <S.Rating readOnly value={review.value} />
                        </S.ReviewTitle>
                        <S.ReviewText>{review.text}</S.ReviewText>
                    </li>
                )}
            </Box>
        </S.Dialog>
    );
}

export default AllReviewsDialog;