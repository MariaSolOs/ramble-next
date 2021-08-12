import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { getGraphQLClient } from 'lib/graphql';
import { getSdk } from 'graphql-server/sdk';

type Credentials = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const graphQLClient = getGraphQLClient();
const sdk = getSdk(graphQLClient);

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        jwt: true,
        maxAge: 15 * 24 * 60 * 60, // Idle session expires after 15 days
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_KEY!
    },
    debug: process.env.VERCEL_ENV === 'development',
    providers: [
        Providers.Credentials({
            async authorize(credentials: Credentials) {
                try {
                    const isNewUser = Boolean(credentials.firstName);

                    if (isNewUser) {
                        const data = await sdk.signUp({
                            email: credentials.email,
                            password: credentials.password,
                            firstName: credentials.firstName!,
                            lastName: credentials.lastName!
                        });
                        return {
                            userId: data.signUpUser._id
                        }
                    } else {
                        const data = await sdk.logIn({
                            email: credentials.email,
                            password: credentials.password
                        });
                        
                        return {
                            userId: data.logInUser._id
                        }
                    }
                } catch (err: any) {
                    const errorMessage = err.message || "We couldn't sign you in.";
                    throw errorMessage;
                }
            }
        })
    ],
    callbacks: {
        async jwt(token, user) { 
            if (user) {
                // We're signing in, so store user data in the token
                return { ...token, ...user }
            } else {
                // Return the token which already has user data
                return token;
            }
        },
        async session(session, token) {
            const { me } = await sdk.getCoreProfile({ userId: token.userId });
            return {
                user: {
                    userId: me._id,
                    creatorId: me.creator?._id || '',
                    firstName: me.firstName,
                    email: me.email,
                    photo: {
                        src: me.photo?.src || '',
                        placeholder: me.photo?.placeholder || ''
                    }
                },
                expires: session.expires
            }
        }
    }
});