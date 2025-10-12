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
      className={`px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/80 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
