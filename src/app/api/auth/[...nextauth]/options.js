import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_SERVER_URL || "http://127.0.0.1:1337";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        // database query for checking strapi user exists or not
        try {
          const { data } = await axios.post(
            `${SERVER_API_URL}/api/auth/local`,
            {
              identifier: credentials.identifier,
              password: credentials.password,
            }
          );

          return data;
        } catch (error) {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(githubProfile) {
        // console.log(githubProfile, "githubProfile");

        return {
          id: githubProfile?.id?.toString(),
          name: githubProfile.name,
          email: githubProfile.email,
          image: githubProfile.avatar_url,
        };
      },
    }),

    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();

        const isGithubUser = account.provider === "github";
        token.id = isGithubUser ? +user.id : user.user.id;
        token.jwt = isGithubUser ? data.jwt : user.jwt;
        token.user = isGithubUser ? data.user : user.user;
      }

      return token;
    },
    async session({ session, token, user }) {
      // console.log(token, "token in sesion");
      // console.log(user, "user in session");
      // console.log(session, "session in session");

      // modify for front-end
      session.id = token.id;
      session.jwt = token.jwt;
      session.user = token.user;

      return session;
    },
  },
};
