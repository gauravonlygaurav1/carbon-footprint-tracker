import React, { useEffect, useState } from "react";
import useAuth from "@/Auth/store";

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useAuth.persist.rehydrate();

    const interval = setInterval(() => {
      if (useAuth.persist.hasHydrated()) {
        setReady(true);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!ready) {
    return React.createElement("div", null, "Loading...");
  }

  return React.createElement(React.Fragment, null, children);
}