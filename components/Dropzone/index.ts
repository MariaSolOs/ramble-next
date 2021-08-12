import type { SvgIconComponent } from '@material-ui/icons';

import Dropzone from './Dropzone';

export type DropzoneProps = {
    image?: File | string;
    onFileDrop: (file?: File) => void;
    addButton?: SvgIconComponent;
    deleteButton?: SvgIconComponent;
    dropzoneClassName: string;
    addButtonClassName?: string; 
    deleteButtonClassName?: string; 
    previewImageClassName: string;
}

export default Dropzone;