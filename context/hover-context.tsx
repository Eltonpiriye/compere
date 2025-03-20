"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HoverContextType {
  hoveredItem: string | null;
  visibleItem: string | null;
  setHoveredItem: (item: string | null) => void;
  setVisibleItem: (item: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [visibleItem, setVisibleItem] = useState<string | null>(null);

  return (
    <HoverContext.Provider
      value={{
        hoveredItem,
        visibleItem,
        setHoveredItem,
        setVisibleItem,
      }}
    >
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const context = useContext(HoverContext);
  if (context === undefined) {
    throw new Error("useHover must be used within a HoverProvider");
  }
  return context;
}
