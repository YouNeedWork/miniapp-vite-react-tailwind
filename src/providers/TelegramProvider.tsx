import React, { createContext, useContext, useEffect, useState } from "react";
import { type Telegram } from "@twa-dev/types";
import { login } from "../api";

interface TelegramContextType {
  telegram: Telegram | null;
  webApp: Telegram["WebApp"] | null;
  user: Telegram["WebApp"]["initDataUnsafe"]["user"] | null;
  ready: boolean;
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
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const app = window.Telegram.WebApp;
      if (app.initData) {
        setTelegram(window.Telegram);
        setWebApp(app);
        if (app.initDataUnsafe?.user) {
          setUser(app.initDataUnsafe.user);
        }

        app.expand();
        app.ready();
        
        const initData = app.initData;
        const referrerCode = app.initDataUnsafe.start_param ?? "";

        const token = localStorage.getItem("token");
        if (!token && initData) {
          login(initData, referrerCode)
            .then((res: any) => {
              localStorage.setItem("token", res.token);
            })
            .catch(console.error);
        }

        setReady(true);
      } else {
        console.log("Running in web browser");
        setReady(false);
      }
    }
  }, []);

  return (
    <TelegramContext.Provider value={{ telegram, webApp, user, ready }}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  return useContext(TelegramContext);
}