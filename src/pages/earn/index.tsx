import React from "react";

export default function EarnView() {
  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-contain pt-[60px]"
      style={{ backgroundImage: "url('/src/assets/imgs/earnBg.png')" }}
    >
      <img className="w-full " src="/src/assets/imgs/earn_title.png" />
      <div className="px-[10px] w-full">
        <div className="flex items-center justify-center mt-[-20px]">
          <img
            className="w-[153px] h-[130px] origin-top-left"
            src="/src/assets/imgs/earnHeader.png"
          />
          <div className="flex flex-col ">
            <div className="w-[184px] text-white text-lg font-black font-['Poppins'] leading-normal">
              Complete the Task, Earn Rewards!
            </div>
            <div className="text-black text-xs font-bold font-['Poppins']">
              Daily Task - Daily reward
            </div>
          </div>
        </div>

        <div className=" w-full  px-[20px] min-h-[439px] p-2.5 bg-white rounded-[20px] shadow border border-black justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch p-2.5 bg-[#fdeeba] rounded-[20px] border border-black justify-start items-center gap-2.5 inline-flex">
              <div className="h-[47px] justify-start items-start gap-[15px] flex">
                <div className="w-[47px] h-[47px] relative">
                  <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-[#afe1fa] rounded-full shadow border border-black"></div>
                  <img
                    className="w-[34px] h-[34px] left-[7px] top-[7px] absolute rounded-[11px]"
                    src="/src/assets/imgs/task_1.png"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
                  Choose your Region
                </div>
                <div className="relative self-stretch grow shrink basis-0">
                  <div className="h-[21px] left-0 top-0 absolute justify-start items-center gap-[5px] inline-flex">
                    <img
                      className="w-[19px] h-[19px]"
                      src="/src/assets/imgs/g_icon.png"
                    />
                    <div className="text-center text-[#999de4] text-sm font-medium font-['Poppins']">
                      +1000
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[30px] px-[46px] bg-[#e04936] rounded-[100px] shadow border border-black justify-center items-center gap-2.5 flex">
                <div className="text-center text-white text-xl font-black font-['Poppins']">
                  Go
                </div>
              </div>
            </div>
            <div className="self-stretch p-2.5 bg-[#fdeeba] rounded-[20px] border border-black justify-start items-center gap-2.5 inline-flex">
              <div className="h-[47px] justify-start items-start gap-[15px] flex">
                <div className="w-[47px] h-[47px] relative">
                  <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-[#db433e] rounded-full shadow border border-black"></div>
                  <img
                    className="w-[34px] h-[34px] left-[7px] top-[7px] absolute rounded-[11px]"
                   src="/src/assets/imgs/task_2.png"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
                  Community
                </div>
                <div className="self-stretch text-black text-[10px] font-normal font-['Poppins'] leading-[13px]">
                  Join our TG channel
                </div>
                <div className="self-stretch justify-start items-center gap-[5px] inline-flex">
                  <img
                    className="w-[19px] h-[19px]"
                     src="/src/assets/imgs/g_icon.png"
                  />
                  <div className="text-center text-[#999de4] text-sm font-medium font-['Poppins']">
                    +1000
                  </div>
                </div>
              </div>
              <div className="h-[30px] px-[46px] bg-[#e04936] rounded-[100px] shadow border border-black justify-center items-center gap-2.5 flex">
                <div className="text-center text-white text-xl font-black font-['Poppins']">
                  Go
                </div>
              </div>
            </div>
            <div className="self-stretch p-2.5 bg-[#fdeeba] rounded-[20px] border border-black justify-start items-center gap-2.5 inline-flex">
              <div className="h-[47px] justify-start items-start gap-[15px] flex">
                <div className="w-[47px] h-[47px] relative">
                  <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-[#90ba57] rounded-full shadow border border-black"></div>
                  <img
                    className="w-[34px] h-[34px] left-[7px] top-[7px] absolute rounded-[11px]"
                     src="/src/assets/imgs/task_3.png"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
                  Retweet
                </div>
                <div className="self-stretch text-black text-[10px] font-normal font-['Poppins'] leading-[13px]">
                  Follow @goldminer On X
                </div>
                <div className="self-stretch justify-start items-center gap-[5px] inline-flex">
                  <img
                    className="w-[19px] h-[19px]"
                     src="/src/assets/imgs/g_icon.png"
                  />
                  <div className="text-center text-[#999de4] text-sm font-medium font-['Poppins']">
                    +3000
                  </div>
                </div>
              </div>
              <div className="h-[30px] px-[46px] bg-[#e04936] rounded-[100px] shadow border border-black justify-center items-center gap-2.5 flex">
                <div className="text-center text-white text-xl font-black font-['Poppins']">
                  Go
                </div>
              </div>
            </div>
            <div className="self-stretch p-2.5 bg-[#fdeeba] rounded-[20px] border border-black justify-start items-center gap-2.5 inline-flex">
              <div className="h-[47px] justify-start items-start gap-[15px] flex">
                <div className="w-[47px] h-[47px] relative">
                  <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-[#edad4b] rounded-full shadow border border-black"></div>
                  <img
                    className="w-[34px] h-[34px] left-[7px] top-[7px] absolute rounded-[11px]"
                     src="/src/assets/imgs/task_4.png"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
                  Referral
                </div>
                <div className="self-stretch text-black text-[10px] font-normal font-['Poppins'] leading-[13px]">
                  Invite 3 friends
                </div>
                <div className="self-stretch justify-start items-center gap-[5px] inline-flex">
                  <img
                    className="w-[19px] h-[19px]"
                     src="/src/assets/imgs/g_icon.png"
                  />
                  <div className="text-center text-[#999de4] text-sm font-medium font-['Poppins']">
                    +5000
                  </div>
                </div>
              </div>
              <div className="h-[30px] px-[46px] bg-[#e04936] rounded-[100px] shadow border border-black justify-center items-center gap-2.5 flex">
                <div className="text-center text-white text-xl font-black font-['Poppins']">
                  Go
                </div>
              </div>
            </div>
            <div className="self-stretch p-2.5 bg-[#fdeeba] rounded-[20px] border border-black justify-start items-center gap-2.5 inline-flex">
              <div className="h-[47px] justify-start items-start gap-[15px] flex">
                <div className="w-[47px] h-[47px] relative">
                  <div className="w-[47px] h-[47px] left-0 top-0 absolute bg-[#e1a8d9] rounded-full shadow border border-black"></div>
                  <img
                    className="w-[34px] h-[34px] left-[7px] top-[7px] absolute rounded-[11px]"
                     src="/src/assets/imgs/task_5.png"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-black text-base font-bold font-['Poppins'] leading-tight">
                  Goldminer Youtube
                  <br />
                  Brest, Minsk, Grodno
                </div>
                <div className="self-stretch justify-start items-center gap-[5px] inline-flex">
                  <img
                    className="w-[19px] h-[19px]"
                     src="/src/assets/imgs/g_icon.png"
                  />
                  <div className="text-center text-[#999de4] text-sm font-medium font-['Poppins']">
                    +10000
                  </div>
                </div>
              </div>
              <div className="h-[30px] px-[46px] bg-[#e04936] rounded-[100px] shadow border border-black justify-center items-center gap-2.5 flex">
                <div className="text-center text-white text-xl font-black font-['Poppins']">
                  Go
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}