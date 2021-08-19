import React from 'react';
import { DateTime } from 'luxon';

import AddSlotForm from './AddSlotForm';
import type { ExperienceOption } from 'hooks/useCreatorCalendarReducer';

export type AddSlotFormProps = {
    startDate: DateTime;
    endDate: DateTime;
    addExperience?: ExperienceOption;
    experienceOptions: ExperienceOption[];
    addDisabled: boolean;
    openDrawer?: boolean;
    onOpenDrawer: () => void;
    onCloseDrawer: () => void;
    onDateChange: (date: DateTime) => void;
    onAddExperienceChange: (expId: string) => void;
    onSubmit: React.FormEventHandler;
}

export default AddSlotForm;