import React from "react";

export default function Navbar() {
  const links = ["Home", "Skills", "About", "Projects", "Contact"];
  return (
    <div className="flex w-full justify-center items-center h-[100px] top-0">
      <div className="flex gap-2 md:gap-4 bg-[#00000005] p-1 rounded-xl shadow-sm">
        {links.map((e, i) => (
          <div
            key={i}
            className="cursor-pointer font-secondary hover:bg-[#00000008] hover:text-black py-2 px-3 rounded-xl"
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
