import GitHubProvider from "next-auth/providers/github";
import prisma from "@/lib/db/prisma";
import { env } from "@/env.mjs";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = "GitHub User";

        if (profile?.email == "khoale") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },

      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    })
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
