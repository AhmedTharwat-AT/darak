import { FaSpinner } from "react-icons/fa6";

function loading() {
  return (
    <div className="min-h-screen  flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-main" />
    </div>
  );
}

export default loading;
