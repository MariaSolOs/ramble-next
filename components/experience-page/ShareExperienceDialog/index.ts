import ShareExperienceDialog from './ShareExperienceDialog';

export type ShareExperienceDialogProps = {
    shareUrl: string;
    experienceTitle: string;
    open: boolean;
    onClose: () => void;
}

export default ShareExperienceDialog;