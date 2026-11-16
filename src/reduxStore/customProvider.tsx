"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../reduxStore";
import { PersistGate } from "redux-persist/integration/react";

/**
 * renderBeforeRehydrate: show the page right away (also on the server)
 * instead of waiting for the persisted state. Same children in both slots,
 * so React keeps them mounted when rehydration finishes.
 */
export function RootProvider({
  children,
  renderBeforeRehydrate = false,
}: {
  children: React.ReactNode;
  renderBeforeRehydrate?: boolean;
}) {
  // Restore saved state only after hydration (see manualPersist in reduxStore).
  useEffect(() => {
    persistor.persist();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={renderBeforeRehydrate ? children : null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
