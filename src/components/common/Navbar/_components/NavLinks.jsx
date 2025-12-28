import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
    <div className={`flex ${className}`}>
      {links.map((e, i) => {
        const active = isActive(e.link);
        return (
          <Link href={e.link} key={i} onClick={onClick}>
            <div
              className={`cursor-pointer font-secondary py-2 px-3 rounded-xl transition-colors ${
                active
                  ? "bg-[#00000010] text-primary font-bold"
                  : "hover:bg-[#00000008] hover:text-primary"
              } ${itemClassName}`}
            >
              {e.text}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
