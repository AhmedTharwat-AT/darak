import PropertiesFilter from "@/components/PropertiesFilter";
import PropertiesWrapper from "@/components/PropertiesWrapper";

async function properties({
  searchParams: { page = "1", sortBy },
}: {
  searchParams: { page: string; sortBy: string };
}) {
  console.log("properties page , :", page, sortBy);
  return (
    <div className=" my-[3.5rem] relative">
      <div className="container flex gap-4 md:flex-nowrap flex-wrap max-md:justify-center">
        <PropertiesFilter className="md:block hidden md:max-w-80 shadow-md" />

        <PropertiesWrapper page={page} sortBy={sortBy} />
      </div>
    </div>
  );
}

export default properties;
