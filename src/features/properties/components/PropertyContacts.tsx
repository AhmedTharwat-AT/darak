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
          <Button>
            <FaPhone className="size-3 sm:size-4" />
            <span className="ms-2 sm:text-xl">Call</span>
          </Button>
        </a>
      )}

      {whatsappLink && (
        <a href={whatsappLink} target="_blank" title={whatsappLink}>
          <Button className="bg-[#67C15E]">
            <RiWhatsappFill className="sm:size-5" />
            <span className="ms-2 sm:text-xl">WhatsApp</span>
          </Button>
        </a>
      )}

      {!whatsappLink && !phoneLink && (
        <p className="rounded-lg border border-gray-300 px-2 py-2">
          no contact info
        </p>
      )}
    </div>
  );
}

export default PropertyContacts;
