import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'ENG' },
  { code: 'lv', name: 'LV' },
  { code: 'lb', name: 'LU' },
  { code: 'de', name: 'DE' },
  { code: 'fr', name: 'FR' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="language-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-button font-medium text-gray-700 hover:text-[#722F37]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {currentLanguage.name}
      </button>

      {isOpen && (
        <div className="language-menu">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`language-item font-medium ${
                i18n.language === language.code ? 'text-[#722F37]' : 'text-gray-700'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;