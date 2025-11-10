import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'nl' as const, label: 'Nederlands', flag: '🇳🇱' },
    { code: 'tr' as const, label: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage(lang.code)}
          className="gap-1"
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </Button>
      ))}
    </div>
  );
};
