import { signoutAction } from "@/actions/auth";

function SignoutBtn({ className }: { className?: string }) {
  return (
    <form action={signoutAction}>
      <button className={className}>sign out</button>
    </form>
  );
}

export default SignoutBtn;
