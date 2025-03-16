import React from "react";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto overflow-x-clip">{children}</div>;
}
