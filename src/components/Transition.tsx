"use client";

import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAnimation } from "@/context/AnimationProvider";

interface CustomMotionProps extends MotionProps {
  className?: string;
}

// Create a new component that uses the custom props
const CustomMotion = motion<CustomMotionProps>("div");

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAnimating, isPending } = useAnimation();
  console.log(isAnimating, isPending, pathname);

  return (
    <AnimatePresence mode="wait">
      {!isAnimating && (
        <div>
          <div className="max-w-screen overflow-x-hidden">
            <CustomMotion
              key={pathname}
              className="fixed inset-0 z-[2000] bg-blue-600 min-h-screen"
              initial={{ x: "100%", scaleX: 0.9 }}
              animate={{ x: ["100%", "-100%"], scaleX: [1, 2, 1] }}
              transition={{ ease: "easeIn", duration: 1 }}
            />
          </div>

          <CustomMotion
            key={pathname + "a"}
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
