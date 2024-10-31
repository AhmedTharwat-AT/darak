import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = { email: credentials.email as string };
        // console.log("cred : ", credentials);

        // check if user exists with those credentials
        if (Math.random() < 0.5) {
          user = {
            email: credentials.email as string,
          };
        }

        // throw new Error("User not found.");
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          return null;
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      console.log(url, baseUrl);
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
