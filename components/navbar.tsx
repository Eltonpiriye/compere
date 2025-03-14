import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/introduction", label: "Introduction" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About Me" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar({ isWhite }: Readonly<{ isWhite?: boolean }>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header
      className={`w-screen grid font-tusker-grotesk text-3xl tracking-wider ${
        isWhite ? "text-[#EDECE8]" : "text-foreground"
      } fixed w-full z-10`}
    >
      <div className="flex justify-between items-center px-4 sm:px-12 py-6 ">
        <Link href={"/"} className="font-bold">
          ELTON PIRIYE.
        </Link>
        <nav>
          <ul className="hidden md:flex space-x-6 uppercase ">
            {links.map(({ href, label }, k) => (
              <li key={k}>
                <NavbarItem href={href}>{label}</NavbarItem>
              </li>
            ))}
          </ul>
          {/* Mobile Menu Button */}
          <Button
            size={"icon"}
            className="md:hidden bg-blue-500 text-white rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background"
          >
            <ul className="flex flex-col space-y-4 min-h-[60svh] pb-5 px-4 pt-[15svh]">
              {links.map(({ href, label }, k) => (
                <li key={k} onClick={() => setIsOpen(false)}>
                  <NavbarItem href={href}>{label}</NavbarItem>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function NavbarItem({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link href={href} className="hover:line-through font-bold uppercase">
      {children}
    </Link>
  );
}
