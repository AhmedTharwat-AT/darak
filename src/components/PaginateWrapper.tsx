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
  const propertiesCount: number | null =
    await getFilteredPropertiesCount(filterValues);

  if (!propertiesCount) return null;

  return (
    <Paginate propertiesCount={propertiesCount || 0} className={className} />
  );
}

export default PaginateWrapper;
