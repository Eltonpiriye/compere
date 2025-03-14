"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const animation = {
  initial: { y: "-100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
};

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 15,
};

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
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        variants={animation}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
