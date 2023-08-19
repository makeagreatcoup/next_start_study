import NextAuth, { Account, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import {getUser,create,} from '@/app/api/users/route'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiHandler } from "next";
import prisma from "@/prisma/prisma";
import { AdapterUser } from "next-auth/adapters";


const authHandler: NextApiHandler =async (req,rsp)=>NextAuth(req,rsp,{
  providers: [
    // {
    //   authorization: {
    //     params: {
    //       state: process.env.STATE_SECRET 
    //     }
    //   },
    //   timeout: 30 * 1000
    // },
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization:{
        params:{
          state:process.env.STATE_SECRET,
        }
      },
      
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter:PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }:{user:User,account:Account|null,profile?:Profile,email?:any,credentials?:Record<string, any>}) {
      if (email?.verificationRequest) {
        // 邮箱验证流程
      } else {  
        // 正常登录流程 
      }
      console.log(user)
      console.log(account)
      console.log(profile)
      console.log(email)
      console.log(credentials)
      return true
    },
    async redirect({ url, baseUrl }:{ url: string, baseUrl: string}) {
      return baseUrl
    },
    async session({ session, user, token }:{ session: any, user: any, token: any}) {
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }:{ token: any, user: any, account: any, profile?: any, isNewUser?: boolean}) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    }
  }
})

export {authHandler as POST,authHandler as GET}
