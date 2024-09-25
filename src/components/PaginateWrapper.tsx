import { getPropertiesCount } from "@/lib/services";
import Paginate from "./Paginate";

async function PaginateWrapper({ className }: { className?: string }) {
  const propertiesCount = await getPropertiesCount();

  return (
    <Paginate propertiesCount={propertiesCount || 0} className={className} />
  );
}

export default PaginateWrapper;
