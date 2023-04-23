import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { prisma } from "config/db"
import { compare } from "bcryptjs"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req){

        const result = await prisma.user.findFirst({
          where : {
            email : credentials.email,
          }
        })

        if(!result){
          throw new Error("Akun tidak ditemukan!")
        }

        return result
      }
    })
  ],
}

export default NextAuth(authOptions)