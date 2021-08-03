import React, { createContext, useContext } from 'react';
import createPersistedState from 'use-persisted-state';

import type { Language } from 'models/translation';
import En from 'translations/en';
import Fr from 'translations/fr';

type TranslationRecord = typeof En | typeof Fr;

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    appText: TranslationRecord;
} 

const dictionaries = { 
    'en': En,
    'fr': Fr 
} as Record<Language, TranslationRecord>;

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    appText: dictionaries['en'],
});

export const useLanguageContext = () => useContext(LanguageContext);

const useLanguageState = createPersistedState('ramble-lang');

export const LanguageProvider: React.FC = (props) => {
    const [language, setLanguage] = useLanguageState<Language>('en');

    return (
        <LanguageContext.Provider
        value={{
            language,
            setLanguage,
            appText: dictionaries[language],
        }}>
            {props.children}
        </LanguageContext.Provider>
    );   
}

export default useLanguageContext;
