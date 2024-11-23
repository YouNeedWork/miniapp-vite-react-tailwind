import React from "react";
import { Outlet } from "react-router-dom";
import { TelegramProvider } from "../hooks/useTelegram";
import RoochDappProvider from "../hooks/useRooch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomNavigation from "../components/BottomNavigation";
import Inviter from "../components/Inveter";

const queryClient = new QueryClient();

export default function Root() {
    return <TelegramProvider>
        <QueryClientProvider client={queryClient}>
            <RoochDappProvider>
                {<Inviter />}
                <Outlet />
                <BottomNavigation />
            </RoochDappProvider>
        </QueryClientProvider>
    </TelegramProvider>;
}
