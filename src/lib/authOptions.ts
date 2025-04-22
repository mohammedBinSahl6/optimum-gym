import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User as PrismaUser } from "@prisma/client";

import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "sign in",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const prismaUser = await prisma.user.findFirst({
          where: {
            OR: [{ username: credentials.email }, { email: credentials.email }],
          },
        });

        if (!prismaUser)
          throw new Error("We don’t know this email or Username");

        const passwordMatch = await compare(
          credentials.password,
          prismaUser.password
        );

        if (!passwordMatch)
          throw new Error("No match with email and password");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userProfile } = prismaUser;

        return { ...userProfile };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (user) {
        return {
          ...token,
          user: user as PrismaUser,
        };
      }
      const newToken = {
        ...token,
      };

      if (trigger === "update") {
        return {
          ...newToken,
          ...session,
        };
      }

      return newToken;
    },
    session: async ({ token, session }) => {
      const updatedSession = {
        ...session,
        user: token.user,
      };

      return updatedSession;
    },
  },
};
