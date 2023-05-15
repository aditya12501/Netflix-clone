import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prismadb';
import { compare } from 'bcrypt';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions:AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{
                    lable:'Email',
                    type: 'email',
                },
                password: {
                    lable: 'Password',
                    type: 'password'
                }
            },
            async authorize(credentials)  {
            if (!credentials?.email || !credentials.password){
                throw new Error('Email and Password required');
            }
            const user = await prisma.user.findUnique({where:{email:credentials.email}});

            if(!user || !user.hashedPassWord ) {
                throw new Error('Email does not exist');
            }

            const isCorrectPassword = await compare(credentials.password,user.hashedPassWord);

            if (!isCorrectPassword) {
                throw new Error("Incorrect password");
            }
            return user;








            }
        })
    ],
    pages:{
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter:PrismaAdapter(prisma),
    session:{
        strategy:'jwt'
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);