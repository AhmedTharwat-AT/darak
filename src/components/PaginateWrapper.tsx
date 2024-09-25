import { getFilteredPropertiesCount, getPropertiesCount } from "@/lib/services";
import Paginate from "./Paginate";

async function PaginateWrapper({
  className,
  restParams,
}: {
  className?: string;
  restParams: any;
}) {
  const propertiesCount = await getFilteredPropertiesCount(restParams);

  return (
    <Paginate propertiesCount={propertiesCount || 0} className={className} />
  );
}

export default PaginateWrapper;
