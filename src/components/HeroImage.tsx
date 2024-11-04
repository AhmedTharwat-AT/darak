import { cn } from "@/lib/utils";
import Image from "next/image";
import heroImage from "@/assets/hero-image.png";

function HeroImage({ className }: { className?: string }) {
  return (
    <Image
      src={heroImage}
      alt="hero"
      className={cn(
        "absolute bottom-0 z-[1] size-full animate-popup-hero object-contain",
        className,
      )}
    />
  );
}

export default HeroImage;
