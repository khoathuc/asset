import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db/prisma";
import bcrypt from 'bcrypt';

export const ADMIN_ROLE = "ADMIN";
export const USER_ROLE = "USER";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) {
            throw new Error("No credentials");
          }

          const user = await prisma.users.findUnique({
            where: { email: credentials.email },
          });

          if (user) {
            return user;
          }
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
