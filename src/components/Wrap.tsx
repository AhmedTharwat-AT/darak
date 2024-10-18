"use client";

import { motion } from "framer-motion";

function Wrap({ children }: any) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: " 0% " }}
      transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
      exit={{
        opacity: 0,
        x: "10%",
        transition: { ease: "easeIn", duration: 5, delay: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default Wrap;
