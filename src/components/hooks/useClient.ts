import { useEffect, useState } from "react";

export default function useClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" || typeof document !== "undefined")
      setClient(true);
  }, []);

  return isClient;
}
