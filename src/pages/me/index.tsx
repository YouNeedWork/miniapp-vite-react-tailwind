import React from "react";

export default function MintVew() {
  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover pt-[60px] relative"
      style={{ backgroundImage: "url('/imgs/mint/bg.png')" }}
    >
      <div
        className=" w-full h-[90px] bg-center bg-no-repeat  bg-cover  flex items-center justify-center gap-2"
        style={{ backgroundImage: "url('/imgs/mint/title_bg.png')" }}
      >
        <img className="w-[42px] h-[42px]" src="/imgs/g_icon.png" />
        <div className="flex flex-col items-start">
          <div className="text-black text-xs font-bold font-['Poppins']">
            Total assets
          </div>
          <div className="text-[#edad4b] text-3xl font-black font-['Poppins'] uppercase">
            2,019,012
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <img
          src="/imgs/me/avator.png"
          className="w-[65px] h-[65px]"
          alt=""
        />
        <div className="text-black text-base font-bold font-['Poppins'] capitalize">
          Mr.Andrew
        </div>
        <div className="w-[146.85px] text-black text-xs font-normal font-['Poppins'] capitalize">
          chen***m@gmail.com
        </div>
      </div>

      <div className=" flex flex-col gap-8  absolute bottom-[70px]  w-screen h-[491px] bg-[#fdeeba] rounded-[20px] border border-black px-[20px] pt-[32px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/wallet_icon.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              My Wallet
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/my_orders.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              My Orders
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/account.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              Account Management
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/lang.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              Language
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
