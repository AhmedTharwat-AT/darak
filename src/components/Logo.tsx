import Image from "next/image";

function Logo() {
  return <Image src={"/assets/logo.svg"} alt="logo" width={135} height={50} />;
}

export default Logo;
