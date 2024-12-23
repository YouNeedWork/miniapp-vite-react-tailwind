import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useCurrentAddress, useCurrentWallet } from "@roochnetwork/rooch-sdk-kit";
import { LanguageSelector } from '@/components/LanguageSelector';

export default function MeView() {
  const { t } = useTranslation();
  const address = useCurrentAddress();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  const handleDisconnect = async () => {
    //await wallet.wallet.();
    // Disconnect logic
  };

  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover pt-[60px] relative"
      style={{ backgroundImage: "url('/imgs/mint/bg.png')" }}
    >
      <div className="flex flex-col justify-center items-center">
        <img
          src="/imgs/me/avator.png"
          className="w-[65px] h-[65px]"
          alt=""
        />
        <div className="text-black text-base font-bold font-['Poppins'] capitalize">
          {address ? `${address.toStr().slice(0, 4)}....${address.toStr().slice(-4)}` : ''}
        </div>
      </div>

      <div className="flex flex-col gap-8 absolute bottom-[70px] w-screen h-[491px] bg-[#fdeeba] rounded-[20px] border border-black px-[20px] pt-[32px]">
        {/* Disconnect Button */}
        <div className="flex justify-between items-center cursor-pointer" onClick={handleDisconnect}>
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/wallet_icon.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              {t('me.disconnect')}
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>

        {/* Language Selector */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsLanguageModalOpen(true)}
        >
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/lang.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              {t('me.language')}
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>
      </div>

      <LanguageSelector
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </div>
  );
}