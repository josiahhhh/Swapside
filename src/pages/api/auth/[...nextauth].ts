import NextAuth from "next-auth";
import PatreonProvider from "next-auth/providers/patreon";

interface Props {
  session: any;
  user: any;
  token: any;
}

export const authOptions = {
  providers: [
    PatreonProvider({
      clientId: process.env.PATREON_ID!,
      clientSecret: process.env.PATREON_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user, token }: Props) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
