import type React from 'react';
import type { DateTime } from 'luxon';

import type { ExperienceOption } from 'hooks/useCreatorCalendarReducer';

import AddSlotForm from './AddSlotForm';

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