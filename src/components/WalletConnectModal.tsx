import {Modal} from "antd";
import {useWallets} from "@roochnetwork/rooch-sdk-kit";
import WalletButton from "./WalletButton";
import React from "react";


interface Props{
  open:boolean;
  onCancel:()=>void;
}

const WalletConnectModal = ({ open, onCancel }:Props) =>{
  const wallets = useWallets();

  return <Modal width={400} footer={null} onCancel={onCancel} open={open}>
    <div className={"p-[20px]"}>
      <div className={"text-lg font-bold mb-[20px]"}>Connect wallet</div>
      {
        wallets.map(item=>{
          return <WalletButton key={item.getName()} wallet={item} onSelect={onCancel}></WalletButton>
        })
      }
    </div>
  </Modal>
}

export default WalletConnectModal;