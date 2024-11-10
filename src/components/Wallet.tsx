import React from "react";
import { useTelegram } from "../hooks/useTelegram";
import RoochWallet from "./RoochWallet";
import TonWallet from "./TonWallet";

export default function Wallet() {
    const { ready } = useTelegram();

    if (ready) {
        return <TonWallet />;
    }

    return <RoochWallet />;
}
