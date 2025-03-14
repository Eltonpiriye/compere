"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HoverContextType = {
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredItem, setHoveredItem }}>
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
