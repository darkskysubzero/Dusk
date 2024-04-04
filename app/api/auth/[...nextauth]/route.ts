import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

export const authOptions:AuthOptions = {
    providers: [
        GithubProvider({
            clientId:"",
            clientSecret:""
        }),

        GoogleProvider({
            clientId: "",
            clientSecret: ""
        }),
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: {type:"text"},
                password:{type:"password"}
            },
            async authorize(credentials){
                if(!credentials || !credentials.email || !credentials.password){
                    return null;
                }
                try{
                    // Connect to Db
                    await connectToDb();

                    // Find user
                    const user = await prisma.user.findFirst({
                        where: {email: credentials.email}
                    })

                    // If no user
                    if(!user){
                        return null;
                    }

                    // If no password then tht means provider is 3rd party
                    if(!user.password){
                        return null;
                    }

                    // Checking if password is correct
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if(!isPasswordCorrect){
                        return null;
                    }

                    // If password is correct
                    return {...user, id:user.id};


                }catch(e){
                    return null;
                }finally{
                    await prisma.$disconnect();
                }
            }
        }) 
    ],
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST}
 
