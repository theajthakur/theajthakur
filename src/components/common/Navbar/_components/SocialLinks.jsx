import React from "react";

export const SocialLinks = ({ social, className = "", itemClassName = "" }) => {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {social.map((e, i) => {
        return (
          <div
            key={i}
            className={`p-1 rounded-full hover:text-primary cursor-pointer transition-colors ${itemClassName}`}
            onClick={() => {
              window.open(e.link);
            }}
          >
            {e.icon}
          </div>
        );
      })}
    </div>
  );
};
