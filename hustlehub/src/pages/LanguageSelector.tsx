import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'fr', label: 'Français' },
    ];

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang); // Switch language
    };

    return (
        <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.label}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
