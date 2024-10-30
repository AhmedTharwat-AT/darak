import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiFilter } from "react-icons/ci";
import FilterProvider from "@/context/FilterContext";
import PropertiesFilter from "../features/properties/components/PropertiesFilter";

function MobileFilter() {
  return (
    <Dialog>
      <DialogTrigger className="block md:hidden" asChild>
        <button className="size-10 rounded-lg bg-mainLight text-center">
          <CiFilter className="size-7 w-full fill-main" />
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={"filter"}
        className="max-h-[95vh] max-w-[90vw] overflow-hidden rounded-[var(--radius)] bg-bgDark max-sm:p-4"
      >
        <DialogTitle className="font-medium uppercase text-blacker">
          Filter
        </DialogTitle>

        <FilterProvider>
          <PropertiesFilter
            showHeader={false}
            className="max-h-[70vh] grow overflow-y-auto p-0 px-6 max-sm:px-2"
          />
        </FilterProvider>
      </DialogContent>
    </Dialog>
  );
}

// className=" w-full "

export default MobileFilter;
