import type { GetReviewsQuery } from 'graphql-server/sdk';

import AllReviewsDialog from './AllReviewsDialog';

export type AllReviewsDialogProps = {
    open: boolean;
    onClose: () => void;
    reviews: GetReviewsQuery['getReviews'];
}

export default AllReviewsDialog;