import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

export const NavLinks = ({
  links,
  className = "",
  itemClassName = "",
  onClick,
}) => {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className={`flex relative ${className}`}>
      {links.map((e, i) => {
        const active = isActive(e.link);
        return (
          <Link href={e.link} key={i} onClick={onClick} className="relative group">
            <div
              className={`relative cursor-pointer font-heading py-2 px-5 rounded-full transition-all duration-300 text-sm md:text-base z-10 ${
                active
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
              } ${itemClassName}`}
            >
              {active && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full shadow-[0_0_15px_rgba(0,139,155,0.08)] z-[-1]"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {/* Subtle interactive dot below link on hover */}
              {!active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-350" />
              )}
              {e.text}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
