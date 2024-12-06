"use client";

import { useAnimation } from "@/context/AnimationProvider";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import Spinner from "../Spinner";

interface CustomMotionProps extends MotionProps {
  className?: string;
}

const CustomMotion = motion<CustomMotionProps>("div");

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAnimating } = useAnimation();

  return (
    <AnimatePresence mode="wait">
      {isAnimating ? (
        <div className="container flex h-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <CustomMotion
            className="fixed inset-0 z-[2000] min-h-screen bg-blue-600"
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "-100%"], scaleX: [1, 2, 1] }}
            transition={{ ease: "easeIn", duration: 1 }}
          />

          <CustomMotion
            className="h-full w-full"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: " 0% " }}
            transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
            exit={{
              opacity: 0,
              x: "10%",
              transition: { ease: "easeIn", duration: 0.195, delay: 0 },
            }}
          >
            {children}
          </CustomMotion>
        </div>
      )}
    </AnimatePresence>
  );
}
