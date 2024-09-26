import Spinner from "@/components/Spinner";

function loading() {
  return (
    <div className="min-h-screen  flex justify-center items-center">
      <p>global</p>
      <Spinner />
    </div>
  );
}

export default loading;
