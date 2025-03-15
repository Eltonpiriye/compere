"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InitialLoadingScreen from "@/components/initial-loading-screen";

type NavigationContextType = {
  isNavigating: boolean;
  startNavigation: () => void;
};

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  startNavigation: () => {},
});

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();

  // Handle initial page load
  useEffect(() => {
    // Check if this is a hard navigation (initial page load)
    const isHardNavigation =
      typeof window !== "undefined" &&
      window.performance
        ?.getEntriesByType("navigation")
        .map((nav) => (nav as PerformanceNavigationTiming).type)
        .includes("navigate");

    if (isHardNavigation) {
      setIsNavigating(true);
    } else {
      setIsInitialLoad(false);
    }
  }, []);

  // Function to start a navigation (for client-side transitions)
  const startNavigation = () => {
    setIsNavigating(true);
  };

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
      {isNavigating && isInitialLoad ? (
        <InitialLoadingScreen
          onLoadingComplete={() => {
            setIsNavigating(false);
            setIsInitialLoad(false);
          }}
        />
      ) : (
        children
      )}
    </NavigationContext.Provider>
  );
}
