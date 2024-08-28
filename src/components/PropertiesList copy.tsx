// "use client";

// import { useSearchParams } from "next/navigation";
// import { Suspense, use } from "react";
// import type { getProperties } from "@/lib/services";

// import Paginate from "./Paginate";
// import SortBy from "./SortBy";
// import PropertyItem from "./PropertyItem";
// import MobileFilter from "./MobileFilter";

// function PropertiesList({
//   properties,
//   propertiesCount,
// }: {
//   properties: ReturnType<typeof getProperties>;
//   propertiesCount: Promise<number | undefined>;
// }) {
//   const awaitedProperties = use(properties);
//   const awaitedPropertiesCount = use(propertiesCount);
//   const searchParams = useSearchParams();
//   const sortBy = searchParams.get("sortBy") || "";

//   let filteredProperties;

//   if (
//     !awaitedPropertiesCount ||
//     !awaitedProperties ||
//     awaitedProperties.length === 0
//   )
//     return <div>no properties to load</div>;

//   if (sortBy === "default" || !sortBy) filteredProperties = awaitedProperties;
//   if (sortBy === "htlprice")
//     filteredProperties = awaitedProperties.sort((a, b) => b.price - a.price);
//   if (sortBy === "lthprice")
//     filteredProperties = awaitedProperties.sort((a, b) => a.price - b.price);
//   if (sortBy === "htlspace")
//     filteredProperties = awaitedProperties.sort((a, b) => b.space - a.space);
//   if (sortBy === "lthspace")
//     filteredProperties = awaitedProperties.sort((a, b) => a.space - b.space);

//   return (
//     // <section className="grid justify-start grid-rows-[auto_1fr]">
//     <section className="flex flex-col">
//       <div className="mb-4 flex lg:justify-between justify-end gap-4">
//         <SortBy />
//         <Suspense fallback={null}>
//           <Paginate
//             propertiesCount={awaitedPropertiesCount}
//             className="lg:flex hidden"
//           />
//         </Suspense>
//         {/* mobile filter */}
//         <MobileFilter />
//       </div>

//       <div className="flex flex-col">
//         <ul className="grid grid-cols-1 lg:grid-cols-2  gap-5 4xl:grid-cols-3">
//           {filteredProperties?.map((property) => (
//             <PropertyItem key={property.id} property={property} />
//           ))}
//         </ul>
//       </div>

//       {/* mobile pagination */}
//       <Suspense fallback={null}>
//         <Paginate
//           propertiesCount={awaitedPropertiesCount}
//           className="justify-center mt-auto pt-8 lg:hidden flex"
//         />
//       </Suspense>
//     </section>
//   );
// }

// export default PropertiesList;
