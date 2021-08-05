import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import apolloClient from 'apollo-client';
import { SignUpDocument, LogInDocument } from 'graphql-server/operations';

type Credentials = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

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
                const isNewUser = Boolean(credentials.firstName);

                if (isNewUser) {
                    const { data, errors } = await apolloClient.mutate({
                        mutation: SignUpDocument,
                        variables: {
                            email: credentials.email,
                            password: credentials.password,
                            firstName: credentials.firstName!,
                            lastName: credentials.lastName!
                        }
                    });

                    if (!data || errors) {
                        const errorMessage = errors ? errors[0].message : "We couldn't sign you in."
                        throw errorMessage;
                    }

                    return {
                        userId: data.signUpUser._id,
                        creatorId: '', // Cannot be a creator if just signed up
                        firstName: data.signUpUser.firstName,
                        email: data.signUpUser.email,
                        photo: { // Cannot have a picture if just signed up
                            src: '',
                            placeholder: ''
                        } 
                    }
                } else {
                    const { data, errors } = await apolloClient.mutate({
                        mutation: LogInDocument,
                        variables: { 
                            email: credentials.email,
                            password: credentials.password 
                        }
                    });
                    
                    if (!data || errors) {
                        const errorMessage = errors ? errors[0].message : "We couldn't log you in.";
                        throw errorMessage;
                    }

                    return {
                        userId: data.logInUser._id,
                        creatorId: data.logInUser.creator?._id || '',
                        firstName: data.logInUser.firstName,
                        email: data.logInUser.email,
                        photo: {
                            src: data.logInUser.photo?.src || '',
                            placeholder: data.logInUser.photo?.placeholder || ''
                        }
                    }
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
        session(session, token) {
            return { 
                user: {
                    userId: token.userId,
                    creatorId: token.creatorId,
                    firstName: token.firstName,
                    email: token.email,
                    photo: token.photo
                },
                expires: session.expires
            }
        }
    }
});