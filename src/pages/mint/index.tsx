import React, { useState } from 'react';
import Wallet from '@/components/Wallet';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { Actions } from './components/Actions';
import { useMintActions } from './hooks/useMintActions';
import { useBalances } from './hooks/useBalances';
import { useHunger } from './hooks/useHunger';
import { AudioControl } from '@/components/AudioControl';
import { Backpack } from '@/components/Backpack';
import { Shop } from '@/components/Shop';

export default function MintView() {
  const address = useCurrentAddress();
  const { handleMine } = useMintActions();
  const { goldBalance, RgasBalance, refetchGoldBalance, refetchRgasBalance } = useBalances();
  const { hunger, refetchHunger } = useHunger();

  const [isBackpackOpen, setIsBackpackOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handleRefresh = () => {
    refetchGoldBalance();
    refetchRgasBalance();
    refetchHunger();
  };

  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover pt-[60px] relative"
      style={{ backgroundImage: "url('/imgs/mint/bg.png')" }}
    >
      <AudioControl className="absolute top-4 right-4 z-50" />

      <div
        className="w-full h-[90px] bg-center bg-no-repeat bg-cover flex items-center justify-center gap-2"
        style={{ backgroundImage: "url('/imgs/mint/title_bg.png')" }}
      >
        <img className="w-[42px] h-[42px]" src="/imgs/g_icon.png" alt="Gold icon" />
        <div className="text-[#edad4b] text-[30px] font-black font-['Poppins'] uppercase">
          {goldBalance}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="h-[55px] px-5 py-[5px] bg-[#999de4] rounded-xl shadow border border-black justify-start items-center gap-[18px] inline-flex">
          <div className="w-[25.17px] h-[36.94px] relative">
            <div className="w-[19.07px] h-[36.94px] left-0 top-0 absolute bg-[#5c5c5c] rounded-sm border border-black"></div>
            <div className="w-[15.49px] h-[9.53px] left-[1.79px] top-[2.98px] absolute bg-[#fcebab] rounded-sm border border-black"></div>
            <div className="w-[15.49px] h-[9.53px] left-[1.79px] top-[2.98px] absolute">
              <div className="w-[15.49px] h-[9.53px] left-0 top-0 absolute bg-[#fcebab] rounded-sm border border-black"></div>
            </div>
            <div className="w-[7.75px] h-[7.75px] left-[5.36px] top-[16.09px] absolute bg-[#db433e] rounded-full border border-black"></div>
          </div>
          <div className="text-[#edad4b] text-3xl font-black font-['Poppins'] uppercase">
            {RgasBalance}
          </div>
        </div>
      </div>

      {address ? (
        <Actions
          mine={handleMine}
          hunger={String(hunger)}
          onOpenBackpack={() => setIsBackpackOpen(true)}
          onOpenShop={() => setIsShopOpen(true)}
          onRefresh={handleRefresh}
        />
      ) : (
        <Wallet />
      )}

      <Backpack isOpen={isBackpackOpen} onClose={() => setIsBackpackOpen(false)} />
      <Shop isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />
    </div>
  );
}