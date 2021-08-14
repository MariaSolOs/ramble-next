import Language from './Language';
import type { CompletableSlide } from 'models/application';

export interface LanguageProps extends CompletableSlide {
    languageList: string[];
    languages: string[];
    onLanguagesChange: (langs: string[]) => void;
}

export default Language;