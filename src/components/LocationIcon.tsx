import Image from "next/image";
import gpsIcon from "@/assets/icons/gps.svg";
import { cn } from "@/lib/utils";

function LocationIcon({ className }: { className?: string }) {
  return (
    <Image
      src={gpsIcon}
      alt="search"
      className={cn("size-8 h-full rounded-lg bg-alt p-1", className)}
      width={20}
      height={20}
    />
  );
}

export default LocationIcon;
