import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./lib/prisma_db";
import { loginSchema } from "./lib/zodSchemas";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user.password) throw new Error("Invalid credentials 1");

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user;
        }

        throw new Error("Invalid credentials 2");
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    signIn: async ({ account, user, profile }) => {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user?.email || "",
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile?.email!,
              name: profile?.name!,
              image: profile?.picture,
              phone: profile?.phone_number,
              auth_method: "google",
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
