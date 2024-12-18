import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n/config';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isOpen,
  onClose
}) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    onClose();
  };

  return (
    <Modal
      title={t('me.selectLanguage')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-4 space-y-2">
        {SUPPORTED_LANGUAGES.map(({ code, name, flag }) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`w-full p-4 flex items-center justify-between rounded-xl border-2 
              ${i18n.language === code 
                ? 'border-[#6db3e1] bg-[#afe1fa]/10' 
                : 'border-gray-200 hover:border-[#6db3e1]'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{flag}</span>
              <span className="font-medium">{name}</span>
            </div>
            {i18n.language === code && (
              <span className="text-[#6db3e1]">✓</span>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
};