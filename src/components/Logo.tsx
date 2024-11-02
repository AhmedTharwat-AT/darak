import Image from "next/image";
import logo from "@/assets/logo.svg";
import AnimatedLink from "./AnimatedLink";

function Logo() {
  return (
    <AnimatedLink href="/">
      <Image src={logo} alt="logo" width={135} height={50} priority />
    </AnimatedLink>
  );
}

export default Logo;
