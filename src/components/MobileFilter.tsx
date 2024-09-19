import PropertiesFilter from "./PropertiesFilter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterProvider from "@/context/FilterContext";
import { CiFilter } from "react-icons/ci";

function MobileFilter() {
  return (
    <Dialog>
      <DialogTrigger className="block md:hidden" asChild>
        <button className="bg-mainLight size-10 rounded-lg text-center">
          <CiFilter className="fill-main size-7 w-full" />
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={"filter"}
        className="bg-bgDark max-w-[90vw] max-h-[95vh]  rounded-[var(--radius)] overflow-y-auto"
      >
        <DialogTitle className="uppercase font-medium text-blacker ">
          Filter
        </DialogTitle>

        <FilterProvider>
          <PropertiesFilter
            showHeader={false}
            className=" h-auto p-0 px-6 min-h-0"
          />
        </FilterProvider>
      </DialogContent>
    </Dialog>
  );
}

export default MobileFilter;
