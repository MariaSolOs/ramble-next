import ShareDialog from './ShareDialog';

export type ShareDialogProps = {
    shareUrl: string;
    dialogTitle: string;
    open: boolean;
    onClose: () => void;
}

export default ShareDialog;