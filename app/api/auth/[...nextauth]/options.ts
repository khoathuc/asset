import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

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

          if (!user || !user?.password) {
            throw new Error("No user found");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          // if password does not match
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.country = user.country;
        token.avatar = user.avatar;
        token.phone = user.phone;
        token.job_title = user.job_title;
        token.description = user.description;
        token.address = user.address;
        token.city = user.city;
        token.state = user.state;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.country = token.country;
        session.user.avatar = token.avatar;
        session.user.phone = token.phone;
        session.user.job_title = token.job_title;
        session.user.description = token.description;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.state = token.state;
      }
      return session;
    },
  },
};
