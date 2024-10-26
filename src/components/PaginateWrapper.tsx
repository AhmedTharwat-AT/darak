import { getFilteredPropertiesCount } from "@/services/prismaApi";

import Paginate from "./Paginate";
import { IFilterValues } from "@/app/(Main)/properties/page";

async function PaginateWrapper({
  className,
  filterValues,
}: {
  className?: string;
  filterValues: IFilterValues;
}) {
  const propertiesCount = await getFilteredPropertiesCount(filterValues);

  return (
    <Paginate propertiesCount={propertiesCount || 0} className={className} />
  );
}

export default PaginateWrapper;
