"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useTransition,
  TransitionStartFunction,
} from "react";

type AnimationContextType = {
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPending, startTransition] = useTransition();

  // once the transition ends , the new route is fetched and ready to be displayed
  useEffect(() => {
    if (!isPending) {
      setIsAnimating(false);
    }
  }, [isPending, setIsAnimating]);

  return (
    <AnimationContext.Provider
      value={{ isAnimating, setIsAnimating, isPending, startTransition }}
    >
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
