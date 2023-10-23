import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

const SERVER_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_SERVER_URL || "http://127.0.0.1:1337";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
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
        console.log(githubProfile, "githubProfile");
        // save into database

        return {
          ...githubProfile,
          image: githubProfile.avatar_url,
          id: githubProfile.id.toString(),
          role: githubProfile.role ?? "user",
        };
      },
    }),

    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.user.id;
        token.jwt = user.jwt;
        token.user = user.user;
      }

      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      // modify for front-end
      session.id = token.id;
      session.accessToken = token.accessToken;
      session.user = token.user;

      return Promise.resolve(session);
    },
  },
};
