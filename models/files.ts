// Image with blurred placeholder
export type Image = {
    src: string;
    placeholder: string;
}

// File with a preview URL for the dropzone
export type PreviewableFile = { 
    file: File; 
    preview: string; 
} | null;

// Data in a blogpost once transformed from Markdown
export type BlogPost = {
    meta: {
        title: string;
        image: Image;
        date: string;
        author: {
            name: string;
            instagram?: string;
            facebook?: string;
        }
    }
    content: string;
}

/**
 * @returns True if img is an Image object (with placeholder).
 */
export const isOptimizedImage = (img: any): img is Image => {
    return (typeof img.src === 'string') && (typeof img.placeholder === 'string');
}

/**
 * @returns True if file is a File object.
 */
export const isFile = (file: any): file is File => {
    return file instanceof File;
}

/**
 * @returns True if file is a previewable file (can be used for dropzone). 
 */
export const isPreviewableFile = (file: any): file is PreviewableFile => {
    return isFile(file.file) && typeof file.preview === 'string';
}