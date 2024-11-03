import { DefaultSession } from "next-auth";

declare module "@auth/core/types" {
  interface User {
    phone?: string | null;
  }

  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    phone?: string;
  }
}
