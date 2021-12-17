import type { CompletableSlide } from 'models/application';

import Language from './Language';

export interface LanguageProps extends CompletableSlide {
    languageList: string[];
    languages: string[];
    onLanguagesChange: (langs: string[]) => void;
}

export default Language;