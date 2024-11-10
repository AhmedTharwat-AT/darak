import Image from "next/image";
import defauleProfile from "@/assets/profile.jpg";
import { UserWithProperties } from "@/lib/types";

function UpdateProfileImage({ user }: { user: UserWithProperties }) {
  return (
    <div className="mb-4 flex justify-center">
      <Image
        src={user.image || defauleProfile}
        width={200}
        height={200}
        alt={user.name || "user"}
        className="rounded-full border-4 border-main shadow-lg"
      />
    </div>
  );
}

export default UpdateProfileImage;
