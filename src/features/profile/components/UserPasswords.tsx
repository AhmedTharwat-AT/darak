import { UserWithProperties } from "@/lib/types";
import { User } from "@prisma/client";

function UserPasswords({ user }: { user: User }) {
  return (
    <div className="my-4 space-y-4 rounded-md border border-gray-300 bg-gray-200 p-4 shadow-md">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* <div>
          <Label name="Password" />
          <Input disabled={pending} {...register("password")} />
        </div>
        <div>
          <Label name="Confirm Password" />
          <Input disabled={pending} {...register("confirm_password")} />
        </div> */}
      </div>
    </div>
  );
}

export default UserPasswords;
