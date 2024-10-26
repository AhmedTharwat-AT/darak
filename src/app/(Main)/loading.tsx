import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="h-full  flex justify-center items-center">
      <p>main</p>
      <Spinner />
    </div>
  );
}

export default loading;
