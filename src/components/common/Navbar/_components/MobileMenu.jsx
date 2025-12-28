import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

export const MobileMenu = ({ isOpen, setIsOpen, links, social }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40 md:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[250px] bg-background border-l border-border z-50 md:hidden shadow-xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-[#00000008] rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <NavLinks
                  links={links}
                  className="flex-col gap-2 items-start"
                  itemClassName="text-lg w-full"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="pt-6 border-t border-border mt-auto">
                <SocialLinks social={social} className="justify-center" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
