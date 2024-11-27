import React from 'react';
import { Button } from '@/components/ui/Button';

export default function FriendsView() {
  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover pt-[60px] relative"
      style={{ backgroundImage: "url('/imgs/friend/bg.png')" }}
    >
      <div className="flex items-center justify-between mx-[20px]">
        <div className="text-white text-3xl font-black font-['Poppins'] uppercase">
          goldminer
        </div>
        <div className="w-[117px] h-[33px] px-2.5 py-[5px] bg-[#e1a8d9] rounded-[100px] shadow border border-black justify-start items-center gap-2.5 inline-flex">
          <div className="text-center text-[#74d29e] text-[19px] font-bold font-['Poppins'] capitalize">
            friends
          </div>
          <img
            src="/imgs/friend/arrow-right.png"
            className="w-[16px] h-[17px]"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-[150px]">
        <div className="text-[40px] text-[#efac57] font-bold">
          INVITE FRIENDS
        </div>
        <div className="w-2/3 text-center text-[18px] text-[#000] font-bold">
          You are your friend will receive bonuses!
        </div>
      </div>

      <div className="mt-[10px] w-full flex justify-center items-center">
        <div
          className="w-[277px] h-[102px] shadow flex items-center justify-center bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: "url('/imgs/friend/message_bg.png')",
          }}
        >
          <div className="text-center">
            <span className="text-black text-sm font-medium font-['Poppins']">
              For every friend that plays, <br />
              you both Get
            </span>
            <span className="text-[#777cd9] text-sm font-medium font-['Poppins']">
              {" "}
              +5,000 FREE!
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-[50%]">
        <Button 
          variant="primary" 
          size="lg"
          rounded="full"
        >
          Invite a Friend
        </Button>
      </div>
    </div>
  );
}