import React from 'react';

import InfosForm from './InfosForm';
import type { ProfileFormField } from 'models/user-interface';

export type InfosFormProps = {
    values: Record<ProfileFormField, string>;
    isCreator: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler;
}

export default InfosForm;