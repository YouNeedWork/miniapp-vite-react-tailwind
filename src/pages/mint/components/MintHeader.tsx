import React from 'react';

interface MintHeaderProps {
  goldBalance: string;
  rgasBalance: string;
  showSessionKeyModal: boolean;
}

export const MintHeader: React.FC<MintHeaderProps> = ({
  goldBalance,
  rgasBalance,
  showSessionKeyModal
}) => {
  return (
    <>
      <div className="w-full h-[90px] md:h-[120px] lg:h-[160px] flex items-center justify-center">
        <div
          className="w-full max-w-[500px] md:max-w-full lg:max-w-[1200px] xl:max-w-[1400px] h-full 
            bg-center bg-no-repeat bg-contain flex items-center justify-center gap-2 md:gap-4 lg:gap-6"
          style={{ backgroundImage: "url('/imgs/mint/title_bg.png')" }}
        >
          <img
            className="w-[42px] h-[42px] md:w-[56px] md:h-[56px] lg:w-[80px] lg:h-[80px]"
            src="/imgs/g_icon.png"
            alt="Gold icon"
          />
          <div className="text-[#edad4b] text-[30px] md:text-[40px] lg:text-[64px] font-black font-['Poppins'] uppercase">
            {goldBalance}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="h-[55px] md:h-[70px] lg:h-[100px] px-5 md:px-7 lg:px-10 py-[5px] md:py-[7px] lg:py-[10px]
          bg-[#999de4] rounded-xl shadow border border-black justify-start items-center gap-[18px] md:gap-[24px] lg:gap-[32px] inline-flex">
          <div className="w-[25px] md:w-[32px] lg:w-[48px] h-[37px] md:h-[46px] lg:h-[68px] relative">
            <div className="w-[19px] md:w-[24px] lg:w-[36px] h-[37px] md:h-[46px] lg:h-[68px] 
              left-0 top-0 absolute bg-[#5c5c5c] rounded-sm border border-black" />
            <div className="w-[15px] md:w-[20px] lg:w-[30px] h-[9px] md:h-[12px] lg:h-[18px] 
              left-[2px] top-[3px] absolute bg-[#fcebab] rounded-sm border border-black" />
            <div className="w-[8px] md:w-[10px] lg:w-[16px] h-[8px] md:h-[10px] lg:h-[16px] 
              left-[5px] md:left-[7px] lg:left-[10px] top-[16px] md:top-[20px] lg:top-[30px] 
              absolute bg-[#db433e] rounded-full border border-black" />
          </div>
          <div className="text-[#edad4b] text-3xl md:text-4xl lg:text-6xl font-black font-['Poppins'] uppercase">
            {rgasBalance}
          </div>
        </div>
      </div>
    </>
  );
};