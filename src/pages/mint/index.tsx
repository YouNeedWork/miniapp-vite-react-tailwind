import React from "react";
import Wallet from "../../components/Wallet";
import { Args, RoochAddress, RoochClient } from "@roochnetwork/rooch-sdk";
import { useCurrentSession } from "@roochnetwork/rooch-sdk-kit";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { useCreateSessionKey } from "@roochnetwork/rooch-sdk-kit";
import { useQuery } from "@tanstack/react-query";
import { PKG } from "../../constant/config";
import { Transaction, ExecuteViewFunctionParams } from "@roochnetwork/rooch-sdk";

import { ShoppingBag } from "lucide-react";
import { Bitcoin } from "lucide-react";
import { Gem } from "lucide-react";

export default function MintVew() {
  const client = new RoochClient({ url: "https://test-seed.rooch.network/" });
  const sessionKey = useCurrentSession()
  const address = useCurrentAddress()

  const { mutateAsync: createSessionKey } = useCreateSessionKey();

  const { data: goldBalance, isLoading: goldBalanceLoading, isError: goldBalanceError, refetch: refetchGoldBalance } = useQuery({
    queryKey: ['goldBalance', address],
    queryFn: async () => {
      if (!address) return 0;
      const objects = await client.getBalance({
        coinType: `${PKG}::gold::Gold`,
        owner: address.genRoochAddress().toStr(),
      });
      return objects.balance ? (Number(objects.balance || 0) / 1e6).toFixed(2) : 0;
    },
    enabled: address !== undefined
  });


  const { data: RgasBalance, isLoading: RgasBalanceLoading, isError: RgasBalanceError, refetch: refetchRgasBalance } = useQuery({
    queryKey: ['RgasBalance', address],
    queryFn: async () => {
      if (!address) return 0;
      const objects = await client.getBalance({
        coinType: `0x3::gas_coin::RGas`,
        owner: address.genRoochAddress().toStr(),
      });
      return objects.balance ? (Number(objects.balance || 0) / 1e8).toFixed(2) : 0;
    },
    enabled: address !== undefined
  });


  const { data: hunger, isLoading: hungerLoading, isError: hungerError, refetch: refetchHunger } = useQuery({
    queryKey: ['Hunger', address],
    queryFn: async () => {
      const result = await client.executeViewFunction({
        address: PKG,
        module: "gold_miner",
        function: "get_hunger_through_times",
        args: [
          Args.address(address!)
        ],
        typeArgs: [],
      });
      console.log(result);
      return result.return_values === undefined ? 0 : result.return_values![0].decoded_value;
    },
    enabled: address !== undefined
  });


  const handleMine = async () => {
    try {
      if (address === undefined) return;

      if (sessionKey === null) {
        try {
          await createSessionKey({
            appName: 'rooch',
            appUrl: window.location.href,
            scopes: [
              '0x1::*::*',
              '0x3::*::*',
              `${PKG}::*::*`
            ],
            maxInactiveInterval: 60 * 60 * 8,
          })
        } catch (e: any) {
        }
      }
      // get object owner by address

      // Check if user has a MineInfo object
      const objects = await client.getStates({
        accessPath: `/resource/${address!.genRoochAddress().toHexAddress()}/${PKG}::gold_miner::MineInfo`,
        stateOption: { decode: true }
      });

      console.log("objects", objects)

      // If no MineInfo found, this is first time - call start function
      if (objects.length === 0) {
        let inviter = localStorage.getItem("inviter");
        const txn = new Transaction();

        txn.callFunction({
          address: PKG,
          module: "gold_miner",
          function: "start",
          args: [
            inviter === null ? Args.address(new RoochAddress("0x0000000000000000000000000000000000000000000000000000000000000000").toStr()) : Args.address(inviter!)
          ],
          typeArgs: [],
        });

        const result = await client.signAndExecuteTransaction({
          transaction: txn,
          signer: sessionKey as any,
        });


        if (result.execution_info.status.type !== 'executed') {
          throw new Error('Failed to start mining');
        }
      } else {
        const txn = new Transaction();
        txn.callFunction({
          address: PKG,
          module: "gold_miner",
          function: "mine",
          args: [
          ],
          typeArgs: [
          ],
        });
        console.log("执行交易", sessionKey)
        console.log("执行交易", txn)

        console.log("执行交易", client)
        const result = await client.signAndExecuteTransaction({
          transaction: txn,
          signer: sessionKey as any,
        })

        console.log(hunger);
        console.log("执行交易", result)
        if (result.execution_info.status.type === 'executed') {
          await Promise.all([
            refetchGoldBalance(),
            refetchRgasBalance(),
            refetchHunger(),
          ])
        }
      }

    } catch (e: any) {
      alert(e);
      console.log(e)
    }
  }



  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover  pt-[60px] relative"
      style={{ backgroundImage: "url('/imgs/mint/bg.png')" }}
    >
      <div
        className=" w-full h-[90px] bg-center bg-no-repeat  bg-cover  flex items-center justify-center gap-2"
        style={{ backgroundImage: "url('/imgs/mint/title_bg.png')" }}
      >
        <img className="w-[42px] h-[42px]" src="/imgs/g_icon.png" />
        <div className="text-[#edad4b] text-[30px] font-black font-['Poppins'] uppercase">
          {goldBalance}
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
          <div className="text-[#edad4b] text-[20px] font-black font-['Poppins'] uppercase">
            {String(RgasBalance)} - {String(hunger)}
          </div>
        </div>
      </div>

      {
        address != undefined ? <Icons mine={handleMine} /> : <Wallet />
      }

    </div>
  );
}

const Icons = ({ mine }: { mine: () => void }) => {
  return <>
    <div className="flex justify-between  items-center w-full  absolute right  bottom-[120px]">
    <img
        alt=""
        src="/imgs/mint/bad.png"
        className="w-[120px] h-[140px] absolute right-[10px] bottom-[90px]"
      />
      <div className="w-[58px] h-[69.90px] left-[20px] top-0 relative">
          <div className="w-14 h-[46px] left-[2px] top-0 absolute">
            <div className="w-[46px] h-[46px] left-0 top-0 flex items-center justify-center absolute bg-[#afe1fa] rounded-[266.12px] border border-black flex items-center justify-center">
              <ShoppingBag />
            </div>
            
          </div>
          <div className="left-[10px] top-[49.90px] absolute text-center text-white text-[13px] font-black font-['Poppins']">
            Shop
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

     
      <div className="flex items-center justify-center w-full gap-5 ">
        
      </div>

      <div className="absolute right-[40px] text-center" onClick={mine}>
        <div className="h-55 w-55">
          <div className="w-55 h-55 bg-[#db433e] rounded-[266.12px] border border-black  flex items-center justify-center">
            <img
              alt=""
              src="/imgs/mint/mint_icon_1.png"
              className="w-[50px] h-[50px]"
            />
          </div>
        </div>

        <div className="h-[13px] px-1 py-[3px] left-[35px] top-0 absolute bg-[#67d488] rounded-lg border justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-white text-[9.76px] font-normal font-['Santral-ExtraBold'] capitalize">
            1
          </div>
        </div>
      </div>
    </div></>
}