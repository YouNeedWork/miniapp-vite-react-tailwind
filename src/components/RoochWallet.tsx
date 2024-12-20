import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import React, { useState } from "react";
import { WalletModal } from "./Wallet/WalletModal";

export default function RoochWallet() {
    const [btnText, setBtnText] = useState("Connect Wallet");
    const [walletConnectModal, setWalletConnectModal] = useState(false);
    const currentAddress = useCurrentAddress();

    const handleConnect = async () => {
        setWalletConnectModal(true);
    };


    const renderWalletBtn = () => {
        return (<>
            <WalletModal open={walletConnectModal} onCancel={() => {
                setWalletConnectModal(false);
            }}
            ></WalletModal>
            <div className="flex items-center justify-center">
                <button onClick={handleConnect} className="m-6 inline-flex items-center justify-center font-bold transition-all duration-200 border-2 border-black shadow-lg active:shadow-md transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-b from-[#e04936] to-[#c43d2b] text-white hover:from-[#c43d2b] hover:to-[#b33526] focus:ring-[#e04936]/50 px-6 py-3 text-lg rounded-full w-full"><div className="flex items-center justify-center gap-2">Connect Wallet</div></button>
            </div>
        </>
        );
    };


    return renderWalletBtn();
}
