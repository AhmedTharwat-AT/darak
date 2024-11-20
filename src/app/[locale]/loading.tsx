import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

export default loading;
