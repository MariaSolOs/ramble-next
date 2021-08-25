import NewReviewDialog from './NewReviewDialog';

export type NewReviewDialogProps = {
    experienceId: string;
    open: boolean;
    onClose: () => void;
}

export default NewReviewDialog;