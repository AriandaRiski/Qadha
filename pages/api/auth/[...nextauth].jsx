import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "config/db"

const bcrypt = require('bcrypt')

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {

          const result = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            }
          })

          if (!result) {
            throw new Error("Akun tidak ditemukan!")
          }

          var cek_pass = bcrypt.compareSync(credentials.password, result.password);

          if (!cek_pass) {
            throw new Error("Akun tidak ditemukan!")
          }

          return result

        } catch (error) {
          console.log(error)
        }


      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {

        const result = await prisma.user.findFirst({
          where: {
            email: user.email,
          }
        })

        const data = {
          username: user.email,
          email: user.email,
          password: ''
        }

        if (!result) {
          await prisma.user.create({
            data: data,
            select: {
              id: true
            }
          })
        }

        return user

      } catch (error) {
        console.log(error)
      }


    },
    async jwt({ token, account, profile }) {

      try {


        if (account) {
          let type = account.type;

          if (type == 'oauth') {
            
            const akun = await prisma.user.findFirst({
              where: {
                email: token.email
              }
            })

            token.sub = akun.id
          }
        }

        return token

      } catch (error) {
        console.log(error)
      }

    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // session.accessToken = token.accessToken
      try {

        session.id = token.sub

        return session

      } catch (error) {
        console.log(error)
      }
    }
  },

  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)