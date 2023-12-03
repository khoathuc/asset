import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  pages:{
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label:"Email", type: "text", placeholder: "Email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if(!credentials){
          return null;
        }

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if(user){
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}){
      if(user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      console.log(token)
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
