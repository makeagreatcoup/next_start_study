import NextAuth, { Account, Profile, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"
import {getUser,create,} from '@/app/api/users/route'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiHandler } from "next";
import prisma from "@/prisma/prisma";
import { AdapterUser } from "next-auth/adapters";
import { getToken } from "next-auth/jwt";
import { getCsrfToken } from "next-auth/react";


const authHandler: NextApiHandler =NextAuth({
  debug:true,
  logger:{
    debug: (code: string, metadata: unknown) => {
    }
  },
  secret: process.env.SECRET,
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    //   authorization:{
    //     params:{
    //       state:process.env.STATE_SECRET,
    //     }
    //   },
      
    // }),
    GithubProvider({
      httpOptions:{
        timeout:50000,
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      // authorization:{
      //   params:{
      //     // code_challenge:generateCodeChallenge(process.env.STATE_SECRET),
      //     // code_challenge_method:"S256",
      //     state:process.env.STATE_SECRET,
      //   },
      // },
      profile:(profile:any)=>{
        console.log("profile----------------------")
        console.log(profile)
        console.log("profile----------------------")
        return {
          id:profile.id,
          name:profile.name,
          email:profile.email,
          image:profile.avatar_url,
        }
      },

    }),
  ],
  adapter:PrismaAdapter(prisma),
  callbacks: {
    async signIn() {
      console.log("signIn----------------------")
      // if (email?.verificationRequest) {
      //   // 邮箱验证流程
      // } else {  
      //   // 正常登录流程 
      // }
      // console.log(user)
      // console.log(account)
      // console.log(profile)
      // console.log(email)
      // console.log(credentials)
      return true
    },
    async redirect({ url, baseUrl }:{ url: string, baseUrl: string}) {
      console.log("redirect----------------------")
      console.log("url:"+url)
      console.log("baseUrl:"+baseUrl)
      return baseUrl
    },
    async session({ session, user, token }:{ session: any, user: any, token: any}) {
      console.log("session----------------------")
      session.accessToken = token.accessToken
      session.user.id = token.id
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }:{ token: any, user: any, account: any, profile?: any, isNewUser?: boolean}) {
      console.log("jwt----------------------")
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    }
  }
})
export {authHandler as POST,authHandler as GET}
