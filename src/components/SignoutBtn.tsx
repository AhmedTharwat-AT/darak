import { signoutAction } from "@/actions/auth";

function SignoutBtn({ className, text }: { className?: string; text: string }) {
  return (
    <form action={signoutAction}>
      <button className={className}>{text}</button>
    </form>
  );
}

export default SignoutBtn;
