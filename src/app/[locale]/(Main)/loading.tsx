import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}

export default loading;
