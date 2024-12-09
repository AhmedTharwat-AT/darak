import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Darak",
    default: "Darak | Get Your Real Estate",
  },
  description: "",
};

function layout({ children }: { children: React.ReactNode }) {
  return children;
}

export default layout;
