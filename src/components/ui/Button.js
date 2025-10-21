import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-center cursor-pointer px-6 py-3 rounded-lg bg-primary text-light font-medium hover:bg-primary/80 transition duration-300 ${className}`}
    >
      <div className="w-full flex justify-center items-center gap-2">
        {children}
      </div>
    </button>
  );
}
