import { Button } from "@/components/ui/button";
import { PropertyWithImages } from "@/lib/types";
import { FaPhone } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";

function PropertyContacts({ property }: { property: PropertyWithImages }) {
  const whatsappLink = property.whatsapp
    ? `https://wa.me/${property.whatsapp}`
    : property.owner?.whatsapp
      ? `https://wa.me/${property.owner?.whatsapp}`
      : "";
  const phoneLink = property.phone
    ? `tel:${property.phone}`
    : property.owner?.phone
      ? `tel:${property.owner?.phone}`
      : "";

  return (
    <div className="ms-auto flex flex-wrap items-stretch gap-4">
      {phoneLink && (
        <a href={phoneLink} target="_blank" title={phoneLink}>
          <Button className="space-x-2">
            <FaPhone className="size-3 sm:size-4" />
            <span className="sm:text-xl">Call</span>
          </Button>
        </a>
      )}
      {whatsappLink && (
        <a href={whatsappLink} target="_blank" title={whatsappLink}>
          <Button className="space-x-2 bg-[#67C15E]">
            <RiWhatsappFill className="sm:size-5" />
            <span className="sm:text-xl">WhatsApp</span>
          </Button>
        </a>
      )}
      {!phoneLink && !whatsappLink && (
        <Button className="space-x-2 bg-red-500 capitalize text-white">
          <span className="text-xl">no contacts</span>
        </Button>
      )}
    </div>
  );
}

export default PropertyContacts;
