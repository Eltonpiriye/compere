"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import PageTransition from "../page-transition";

type TransitionContextType = {
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
});

export const useTransition = () => {
  return useContext(TransitionContext);
};

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [key, setKey] = useState(0); // Add a key to force re-render
  const router = useRouter();
  const pathname = usePathname();

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      setIsTransitioning(true);

      // After the animation completes, set initial load to false
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        setIsTransitioning(false);
      }, 2500); // Enough time for the full animation to complete

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Handle page transitions
  useEffect(() => {
    if (nextPath && !isInitialLoad) {
      // Start the transition
      setIsTransitioning(true);

      // Increment key to force re-render of PageTransition
      setKey((prev) => prev + 1);

      // Navigate to the new page
      const navigationTimer = setTimeout(() => {
        router.push(nextPath);

        // End the transition after animation completes
        const completionTimer = setTimeout(() => {
          setIsTransitioning(false);
          setNextPath(null);
        }, 800); // Allow enough time for the exit animation

        return () => clearTimeout(completionTimer);
      }, 400); // Time before navigation happens

      return () => clearTimeout(navigationTimer);
    }
  }, [nextPath, router, isInitialLoad]);

  // Reset transition state when pathname changes directly (e.g. back button)
  useEffect(() => {
    if (!isInitialLoad && !isTransitioning) {
      // Reset state for next transition
      setNextPath(null);
    }
  }, [pathname, isInitialLoad, isTransitioning]);

  const startTransition = useCallback(
    (href: string) => {
      if (href !== pathname) {
        // Always set nextPath to trigger transition
        setNextPath(href);
      }
    },
    [pathname]
  );

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {isTransitioning && (
        <PageTransition key={key} isInitialLoad={isInitialLoad} />
      )}
      <div className={isInitialLoad ? "invisible" : "visible"}>{children}</div>
    </TransitionContext.Provider>
  );
}
