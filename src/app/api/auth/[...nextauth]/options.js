import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'username'
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: 'password'
          }
        },
        async authorize(credentials) {

          console.log(credentials, 'credentials')

          // database query 
          const user = await axios.post(`${process.env.STRAPI_SERVER_URL}/api/auth/local`, {
            identifier: credentials.identifier,
            password: credentials.password
          })
          console.log(user, 'user')



          // const user = {id: 101, name: 'kawsar', password: '123', role: 'user'};
          // if(credentials?.username === user.name && credentials?.password === user.password) {
          //   return user;
          // } else {
          //   return null;
          // }


        }
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        profile(githubProfile) {

          // console.log(githubProfile, 'githubProfile')
          // save into database

          return {
            ...githubProfile,
            image: githubProfile.avatar_url,
            id: githubProfile.id.toString(),
            role: githubProfile.role ?? 'user'
          }
        }
      })

      // ...add more providers here
    ],
    callbacks: {
      async jwt({ token, user }) {

        // console.log(token, 'token')
        // console.log(user, 'user')

        if(user) token.role = user.role;
        return token;
      },
      async session({ session, token }) {

        if(session?.user) session.user.role = token.role
        return session;
      }
    }
}

