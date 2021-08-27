import type { EditStep } from 'models/experience-interface';

import EditingLayout from './EditingLayout';

export type EditingLayoutProps = {
    isOnlineExperience: boolean;
    currentStep: EditStep;
    canContinue: boolean;
    onNext: () => void;
    onBack: () => void;
    onSave: () => void;
    onNavigate: (stepIdx: number) => void;
}

export default EditingLayout;