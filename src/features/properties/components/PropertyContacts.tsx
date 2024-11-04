import { Button } from "@/components/ui/button";
import { PropertyWithImages } from "@/lib/types";
import { FaPhone } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";

function PropertyContacts({ property }: { property: PropertyWithImages }) {
  return (
    <div className="ms-auto flex flex-wrap items-stretch gap-4">
      {property.phone && (
        <Button className="space-x-2">
          <FaPhone className="size-4" />
          <span className="text-xl">Call</span>
        </Button>
      )}
      {property.whatsapp && (
        <Button className="space-x-2 bg-[#67C15E]">
          <RiWhatsappFill className="size-6" />
          <span className="text-xl">WhatsApp</span>
        </Button>
      )}
    </div>
  );
}

export default PropertyContacts;
