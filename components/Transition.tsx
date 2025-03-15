"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsClient(true);
  }, [pathname]);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial="initial" animate="animate">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
