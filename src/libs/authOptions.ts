import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Venue Explorer",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email?.trim() || !credentials.password) {
          return null;
        }

        try {
          const user = await userLogIn(credentials.email.trim(), credentials.password);

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            token: user.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.token = token.token ?? "";

      return session;
    },
  },
};
