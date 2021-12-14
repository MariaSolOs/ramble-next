import type React from 'react';

import Dropzone from './Dropzone';

export type DropzoneProps = {
    image?: File | string;
    onFileDrop: (file?: File) => void;
    addButton?: React.ElementType;
    deleteButton?: React.ElementType;
    className?: string;
}

export default Dropzone;