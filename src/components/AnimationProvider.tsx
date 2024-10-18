"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type AnimationContextType = {
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}
