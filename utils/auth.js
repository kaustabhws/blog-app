import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from './connect'
import { getServerSession } from "next-auth";

const gid = process.env.GOOGLE_ID || "";
const gsecret = process.env.GOOGLE_SECRET || "";

const ghid = process.env.GITHUB_ID || "";
const ghsecret = process.env.GITHUB_SECRET || "";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: gid,
      clientSecret: gsecret,
    }),
    GithubProvider({
      clientId: ghid,
      clientSecret: ghsecret,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions)