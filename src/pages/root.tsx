import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { TelegramProvider, useTelegram } from "../hooks/useTelegram";
import RoochDappProvider from "../hooks/useRooch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wallet from "../components/Wallet";

import { TonConnectUIProvider } from '@tonconnect/ui-react';

const queryClient = new QueryClient();


export default function Root() {
    return <TelegramProvider>
        <QueryClientProvider client={queryClient}>
            <TonConnectUIProvider manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}>
                <RoochDappProvider>
                    <Wallet />
                    <Outlet />
                </RoochDappProvider>
            </TonConnectUIProvider>
        </QueryClientProvider>
    </TelegramProvider>;
}
