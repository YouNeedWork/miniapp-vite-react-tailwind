import React from "react";

export default function MintVew() {
  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover  pt-[60px] relative"
      style={{ backgroundImage: "url('/src/assets/imgs/mint/bg.png')" }}
    >
      <div
        className=" w-full h-[90px] bg-center bg-no-repeat  bg-cover  flex items-center justify-center gap-2"
        style={{ backgroundImage: "url('/src/assets/imgs/mint/title_bg.png')" }}
      >
        <img className="w-[42px] h-[42px]" src="/src/assets/imgs/g_icon.png" />
        <div className="text-[#edad4b] text-3xl font-black font-['Poppins'] uppercase">
          2,019,012
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className=" h-[55px] px-5 py-[5px] bg-[#999de4] rounded-xl shadow border border-black justify-start items-center gap-[18px] inline-flex">
          <div className="w-[25.17px] h-[36.94px] relative">
            <div className="w-[19.07px] h-[36.94px] left-0 top-0 absolute bg-[#5c5c5c] rounded-sm border border-black"></div>
            <div className="w-[15.49px] h-[9.53px] left-[1.79px] top-[2.98px] absolute bg-[#fcebab] rounded-sm border border-black"></div>
            <div className="w-[15.49px] h-[9.53px] left-[1.79px] top-[2.98px] absolute">
              <div className="w-[15.49px] h-[9.53px] left-0 top-0 absolute bg-[#fcebab] rounded-sm border border-black"></div>
            </div>
            <div className="w-[7.75px] h-[7.75px] left-[5.36px] top-[16.09px] absolute bg-[#db433e] rounded-full border border-black"></div>
          </div>
          <div className="text-[#edad4b] text-3xl font-black font-['Poppins'] uppercase">
            19,025
          </div>
        </div>
      </div>
      <div className=" absolute bottom-[250px] right-[20px] w-[73px] h-[73px] bg-[#e04936] rounded-full shadow border border-black">
        <div className="text-center text-white text-[29px] font-black font-['Poppins'] uppercase">
          1
        </div>
        <div className="text-center text-white text-xs font-bold font-['Poppins'] uppercase tracking-wide">
          Level
        </div>
      </div>



      <div className="flex justify-between  items-center w-full  absolute  bottom-[120px]">
        <img
          alt=""
          src="/src/assets/imgs/mint/bad.png"
          className="w-[90px] h-[100px]"
        />
        <div className="w-[131px] h-[70px] flex items-center justify-center gap-5 ">
          <div className="w-[58px] h-[69.90px] left-0 top-0 relative">
            <div className="w-14 h-[46px] left-[2px] top-0 absolute">
              <div className="w-[46px] h-[46px] left-0 top-0 absolute bg-[#afe1fa] rounded-[266.12px] border border-black flex items-center justify-center">
                <img
                  alt=""
                  src="/src/assets/imgs/mint/mint_icon.png"
                  className="w-[23px] h-[27px]"
                />
              </div>
              <div className="h-[13px] px-1 py-[3px] left-[35px] top-0 absolute bg-[#67d488] rounded-lg border justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-white text-[9.76px] font-normal font-['Santral-ExtraBold'] capitalize">
                  +3
                </div>
              </div>
            </div>
            <div className="left-0 top-[49.90px] absolute text-center text-white text-[13px] font-black font-['Poppins']">
              Energy
            </div>
          </div>
          <div className="w-14 h-[70px] top-0 relative">
            <div className="w-[46px] h-[46px] left-0 top-0 absolute">
              <div className="w-[46px] h-[46px] left-0 top-0 absolute bg-[#db433e] rounded-[266.12px] border border-black  flex items-center justify-center">
                <img
                  alt=""
                  src="/src/assets/imgs/mint/mint_icon_1.png"
                  className="w-[23px] h-[27px]"
                />
              </div>
            </div>
            <div className="left-[9px] top-[50px] absolute text-center text-white text-[13px] font-black font-['Poppins']">
              Tool
            </div>
            <div className="h-[13px] px-1 py-[3px] left-[35px] top-0 absolute bg-[#67d488] rounded-lg border justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-white text-[9.76px] font-normal font-['Santral-ExtraBold'] capitalize">
                +3
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
