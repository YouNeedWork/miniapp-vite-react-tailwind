import { useCurrentAddress, useWalletStore } from "@roochnetwork/rooch-sdk-kit";
import React, { useState } from "react";
import WalletConnectModal from "./WalletConnectModal";

export default function RoochWallet() {
    const [btnText, setBtnText] = useState("Connect Wallet");
    const [walletConnectModal, setWalletConnectModal] = useState(false);
    const currentAddress = useCurrentAddress();
    const connectionStatus = useWalletStore((state) => state.connectionStatus);
    const setWalletDisconnected = useWalletStore(
        (state) => state.setWalletDisconnected
    );

    const handleConnect = async () => {
        if (connectionStatus === "connected") {
            setWalletDisconnected();
            return;
        }
        setWalletConnectModal(true);
    };


    const renderWalletBtn = () => {
        if (connectionStatus === "connected") {
            return (<>
                <WalletConnectModal
                    open={walletConnectModal}
                    onCancel={() => {
                        setWalletConnectModal(false);
                    }}
                ></WalletConnectModal>
                <div
                    onMouseEnter={() => setBtnText("Disconnect")}
                    onMouseLeave={() =>
                        setBtnText(currentAddress?.toStr() || "")
                    }
                    onClick={handleConnect}
                    className={
                        "pc:px-[10px] pc:w-[180px] w-auto px-[5px] text-center py-[5px] rounded pc:ml-[30px] pl-[10px] transition-all cursor-pointer bg-[#00ADB280] hover:bg-[#ff000060]"
                    }
                >
                    {btnText}
                </div>
            </>
            );
        }
        return (<>
            <WalletConnectModal
                open={walletConnectModal}
                onCancel={() => {
                    setWalletConnectModal(false);
                }}
            ></WalletConnectModal>
            <div
                onClick={handleConnect}
                className={
                    "pc:px-[10px] pc:w-[180px] w-auto  text-center py-[5px] rounded  ml-[10px]  pc:ml-[30px] cursor-pointer bg-[#00ADB2] dark:text-white"
                }
            >
                {"Connect Wallet"}
            </div>
        </>
        );
    };


    return renderWalletBtn();
}
