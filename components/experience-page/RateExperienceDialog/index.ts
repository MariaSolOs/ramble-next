import RateExperienceDialog from './RateExperienceDialog';

export type RateExperienceDialogProps = {
    experienceId: string;
    open: boolean;
    onClose: () => void;
}

export default RateExperienceDialog;