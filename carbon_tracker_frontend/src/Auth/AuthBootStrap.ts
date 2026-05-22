import { useEffect, useState } from "react";
import useAuth from "@/Auth/store";

export default function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useAuth.persist.rehydrate();

    const unsub = useAuth.persist.onFinishHydration(() => {
      setReady(true);
    });

    return unsub;
  }, []);

  if (!ready) return " Loading... ";

  return children;
}