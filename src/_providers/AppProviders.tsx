"use client";

import { persistor, store } from "@/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster
        richColors
        dir="rtl"
        duration={3000}
        // pauseWhenPageIsHidden
        visibleToasts={4}
        closeButton
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryProvider>{children}</QueryProvider>
        </PersistGate>
      </Provider>
    </>
  );
};
