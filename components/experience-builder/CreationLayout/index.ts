import CreationLayout from './CreationLayout';
import type { CreationStep } from 'models/experience-interface';

export type CreateLayoutProps = {
    stepsCompleted: number;
    currentStep: CreationStep;
    currentStepIdx: number;
    canContinue: boolean;
    onNext: () => void;
    onBack: () => void;
    onNavigate: (stepIdx: number) => void;
}

export type CreateLayoutStyleProps = {
    progressValue: number;
}

export default CreationLayout;