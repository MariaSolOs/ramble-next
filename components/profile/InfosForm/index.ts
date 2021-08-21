import type React from 'react';

import type { ProfileFormField } from 'models/user-interface';

import InfosForm from './InfosForm';

export type InfosFormProps = {
    values: Record<ProfileFormField, string>;
    isCreator: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler;
}

export default InfosForm;