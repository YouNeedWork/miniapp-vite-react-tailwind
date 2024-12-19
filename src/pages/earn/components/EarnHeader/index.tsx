import React from 'react';
import { useTranslation } from 'react-i18next';

export const EarnHeader: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-center mt-[-20px] mb-6">
      <img
        className="w-[153px] h-[130px] origin-top-left"
        src="/imgs/earnHeader.png"
        alt={t('earn.title')}
      />
      <div className="flex flex-col">
        <div className="w-[184px] text-white text-lg font-black font-['Poppins'] leading-normal">
          {t('earn.title')}
        </div>
        <div className="text-black text-xs font-bold font-['Poppins']">
          {t('earn.subtitle')}
        </div>
      </div>
    </div>
  );
};