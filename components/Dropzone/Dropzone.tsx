/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

import { isFile, isPreviewableFile } from 'models/files';
import type { PreviewableFile } from 'models/files';
import type { DropzoneProps } from './index';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const BASE_OPTIONS: DropzoneOptions = {
    accept: 'image/jpg, image/jpeg, image/png',
    noClick: true,
    noKeyboard: true,
    maxFiles: 1
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
    const [image, setImage] = useState<PreviewableFile | string>(null);

    const handleAddFile = useCallback((files: File[]) => {
        const dropped = files[0];
        // Create URL for the image preview
        setImage({
            file: dropped,
            preview: URL.createObjectURL(dropped)
        });
        // Report file to parent
        props.onFileDrop(dropped);

        // We can assume that the file drop callback never changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteFile = useCallback(() => {
        // Revoke preview URL if we had a file
        if (isPreviewableFile(image)) {
            URL.revokeObjectURL(image!.preview);
        }
        setImage(null);
        // Report to parent
        props.onFileDrop();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image]);

    // Keep previewable file updated 
    useEffect(() => {
        if (props.image) {
            if (isFile(props.image)) {
                setImage({
                    file: props.image,
                    preview: URL.createObjectURL(props.image)
                });
            } else {
                setImage(props.image);
            }
        }
    }, [props.image]);

    // Make sure to avoid memory leaks
    useEffect(() => {
        return () => {
            if (image && isPreviewableFile(image)) {
                URL.revokeObjectURL(image.preview);
            }
        }
    }, [image]);
    
    const { getRootProps, getInputProps, open } = useDropzone({
        ...BASE_OPTIONS,
        onDrop: handleAddFile
    }); 

    // If there's a file, show the preview, else display the dropzone
    if (image) {
        return (
            <div className={props.className}>
                <img
                src={isPreviewableFile(image) ? image.preview : image}
                alt="Dropzone"
                className="preview" />
                {props.deleteButton && <props.deleteButton onClick={handleDeleteFile} />}
            </div>
        );
    } else {
        return (
            <div { ...getRootProps({ className: props.className }) }>
                <input { ...getInputProps() } />
                {props.addButton && <props.addButton onClick={open} />}
                {props.children}
            </div>
        );
    }
}

Dropzone.defaultProps = {
    onFileDrop: () => {},
    addButton: AddCircleIcon,
    deleteButton: HighlightOffIcon
}

export default Dropzone;