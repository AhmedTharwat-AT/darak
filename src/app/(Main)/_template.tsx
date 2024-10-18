import Transition from "@/components/Transition";
import { ReactNode } from "react";

function template({ children }: { children: ReactNode }) {
  return <Transition>{children}</Transition>;
}

export default template;
