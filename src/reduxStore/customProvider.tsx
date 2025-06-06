"use client";
import { Provider } from "react-redux";
import store, { persistor } from "../reduxStore";
import { PersistGate } from "redux-persist/integration/react";

export function RootProvider({ children }: { children: React.ReactNode }) {

  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
