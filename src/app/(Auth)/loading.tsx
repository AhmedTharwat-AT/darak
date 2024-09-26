import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center flex-col text-center">
      <Spinner />
      <p>Loading signin page...</p>
    </div>
  );
}

export default loading;
