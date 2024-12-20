import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Telegram } from "@twa-dev/types";
import { login } from "../api";

interface TelegramContextType {
  telegram: Telegram | null;
  webApp: Telegram["WebApp"] | null;
  user: Telegram["WebApp"]["initDataUnsafe"]["user"] | null;
  ready: boolean;
}

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const TelegramContext = createContext<TelegramContextType>({
  telegram: null,
  webApp: null,
  user: null,
  ready: false,
});

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [telegram, setTelegram] = useState<Telegram | null>(null);
  const [webApp, setWebApp] = useState<Telegram["WebApp"] | null>(null);
  const [user, setUser] = useState<Telegram["WebApp"]["initDataUnsafe"]["user"] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.Telegram !== "undefined" && typeof window.Telegram.WebApp !== "undefined") {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData !== "") {
        const app = window.Telegram.WebApp;
        setTelegram(window.Telegram);
        setWebApp(app);
        if (app.initDataUnsafe?.user) {
          setUser(app.initDataUnsafe.user);
        }

        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.ready();
        const WebApp = window.Telegram.WebApp;
        const initData = WebApp.initData;
        const referrerCode = WebApp.initDataUnsafe.start_param ?? "";

        const token = localStorage.getItem("token");
        if (token == null && initData) {
          login(initData, referrerCode)
            .then((res: any) => {
              localStorage.setItem("token", res.token);
            })
            .catch((err: any) => {
            });
        }

        setReady(true);
      } else {
        setReady(false);
      }
    }
  }, []);

  return (
    <TelegramContext.Provider
      value={{
        telegram,
        webApp,
        user,
        ready,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  return context;
}