import React from "react";
import { useCurrentAddress, useCurrentWallet } from "@roochnetwork/rooch-sdk-kit";

export default function MeView() {
  const wallet = useCurrentWallet();
  const handleDisconnect = async () => {
    //await wallet?.wallet?.sign(new TextEncoder().encode("123"));
    //await disconnect();
  };

  const address = useCurrentAddress();

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
        <div className="flex justify-between items-center cursor-pointer" onClick={handleDisconnect}>
          <div className="flex gap-2 items-center">
            <img
              src="/imgs/me/wallet_icon.png"
              className="w-[47px] h-[47px]"
              alt=""
            />
            <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
              Disconnect
            </div>
          </div>
          <img
            src="/imgs/me/arrow-right.png"
            className="w-[20px] h-[18px]"
            alt=""
          />
        </div>
        {/* Commented out My Orders
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
        */}
        {/* Commented out Account Management
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
        */}
        {/* Commented out Language
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
        */}
      </div>
    </div>
  );
}