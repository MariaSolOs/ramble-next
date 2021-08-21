import type React from 'react';

import Form from './Form';

export type FormProps = {
    creatorName: string;
    showDropzone: boolean;
    photo?: File;
    bio: string;
    phoneNumber: string;
    frontId?: File;
    backId?: File;
    submitDisabled: boolean;
    onPhotoChange: (file?: File) => void;
    onBioChange: (bio: string) => void;
    onPhoneNumberChange: (phoneNum: string) => void;
    onFrontIdChange: (id?: File) => void;
    onBackIdChange: (id?: File) => void;
    onSubmit: React.FormEventHandler;
}

export default Form;